const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/userModel')

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const postCtrl = {
    createPost: async (req, res) => {
        try {
            const { postData, images } = req.body
    
            if(!images || images.length === 0) {
                return res.status(400).json({msg: "Veuillez ajouter au moins une photo."})
            }
    
           
    
            // Validación de campos requeridos
            if (!postData.subCategory) {
                return res.status(400).json({msg: "La catégorie est requise."})
            }
    
            
            // 🔥 CREAR NUEVO POST SIMPLIFICADO
            const newPost = new Posts({
                ...postData, // ✅ TODOS los campos automáticamente
                images,
                user: req.user._id,
                
               
                // Arrays que deben estar inicializados
               
                images: images || []
            })
    
            await newPost.save()
    
            // 🔥 POPULATE OPTIMIZADO
            await newPost.populate('user', 'avatar username fullname followers')
    
            res.json({
                msg: 'Post créé avec succès!',
                newPost
            })
    
        } catch (err) {
            console.error('Error en createPost:', err)
            return res.status(500).json({msg: err.message})
        }
    },
  
    updatePost: async (req, res) => {
        try {
            const { postData, images } = req.body
    
         
           
    
            // Buscar y actualizar el post
            const post = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        ...postData, // ✅ TODOS los campos automáticamente
                        images: images || postData.images,
                        
                     
                        // Arrays
                        
                    }
                },
                { new: true, runValidators: true }
            )
    
            if (!post) {
                return res.status(400).json({msg: "Ce post n'existe pas."})
            }
    
            // Populate para obtener datos del usuario
            await post.populate('user', 'avatar username fullname followers')
    
            res.json({
                msg: 'Post modifié avec succès!',
                newPost: post
            })
    
        } catch (err) {
            console.error('Error en updatePost:', err)
            return res.status(500).json({msg: err.message})
        }
    },
 
    likePost: async (req, res) => {
        try {
            const post = await Posts.find({_id: req.params.id, likes: req.user._id})
            if(post.length > 0) return res.status(400).json({msg: "You liked this post."})

            const like = await Posts.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user._id}
            }, {new: true})

            if(!like) return res.status(400).json({msg: 'This post does not exist.'})

            res.json({msg: 'Liked Post!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    unLikePost: async (req, res) => {
        try {

            const like = await Posts.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.user._id}
            }, {new: true})

            if(!like) return res.status(400).json({msg: 'This post does not exist.'})

            res.json({msg: 'UnLiked Post!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

// ✅ NUEVO ENDPOINT PARA BÚSQUEDA INTELIGENTE
// ✅ NUEVO CONTROLADOR PARA BÚSQUEDA INTELIGENTE DE POSTS
// controllers/postCtrl.js
 
getPosts: async (req, res) => {
    try {
        const { 
            subCategory, 
            destinacion, 
            datedeparMin,    // 🆕 Fecha mínima (coincide con campo real)
            datedeparMax,    // 🆕 Fecha máxima (coincide con campo real)
            nombreHotel,     // Búsqueda por hotel
            minPrice,        // 🆕 Precio mínimo
            maxPrice,        // 🆕 Precio máximo
            sort
        } = req.query;

        // 🔹 INICIALIZAR QUERY
        const query = {};

        // 🔹 Filtros directos
        if (subCategory && subCategory.trim() !== "") {
            query.subCategory = { $regex: subCategory.trim(), $options: "i" };
        }

        // 🔹 Búsqueda mejorada para destino
        if (destinacion && destinacion.trim() !== "") {
            const searchDestinacion = destinacion.trim();
            query.$or = [
                { destinacion: { $regex: searchDestinacion, $options: "i" } },
                { destinacionvoyage1: { $regex: searchDestinacion, $options: "i" } },
                { destinacionomra: { $regex: searchDestinacion, $options: "i" } },
                { destinacionlocacionvoyage: { $regex: searchDestinacion, $options: "i" } }
            ];
        }

        // 🆕 BÚSQUEDA POR NOMBRE DE HOTEL
        if (nombreHotel && nombreHotel.trim() !== "") {
            const searchHotel = nombreHotel.trim();
            query.$or = query.$or || [];
            query.$or.push(
                { nombreHotel: { $regex: searchHotel, $options: "i" } },
                { hotelMeca: { $regex: searchHotel, $options: "i" } },
                { hotelMedina: { $regex: searchHotel, $options: "i" } }
            );
        }

        // 🆕 FILTRO POR RANGO DE FECHAS - CORREGIDO (datedeparMin/Max)
        if (datedeparMin || datedeparMax) {
            const dateFilter = {};
            
            if (datedeparMin) {
                // Validar fecha inicio
                const startDate = new Date(datedeparMin);
                if (!isNaN(startDate.getTime())) {
                    dateFilter.$gte = startDate;
                }
            }
            
            if (datedeparMax) {
                // Validar fecha fin y ajustar a fin del día
                const endDate = new Date(datedeparMax);
                if (!isNaN(endDate.getTime())) {
                    endDate.setHours(23, 59, 59, 999); // Hasta el final del día
                    dateFilter.$lte = endDate;
                }
            }
            
            // Solo aplicar filtro si hay fechas válidas
            if (Object.keys(dateFilter).length > 0) {
                query.datedepar = dateFilter;
            }
        }

        // 🆕 FILTRO POR RANGO DE PRECIOS - NUEVO
        if (minPrice || maxPrice) {
            const priceFilter = {};
            
            if (minPrice) {
                const min = parseFloat(minPrice);
                if (!isNaN(min)) {
                    priceFilter.$gte = min;
                }
            }
            
            if (maxPrice) {
                const max = parseFloat(maxPrice);
                if (!isNaN(max)) {
                    priceFilter.$lte = max;
                }
            }
            
            // Solo aplicar filtro si hay precios válidos
            if (Object.keys(priceFilter).length > 0) {
                // Buscar en múltiples campos de precio
                query.$or = query.$or || [];
                query.$or.push(
                    { precioBase: priceFilter },
                    { price: priceFilter },
                    { prixAdulte: priceFilter }
                );
            }
        }

        // 🔥 Mantener paginación con APIfeatures
        const features = new APIfeatures(Posts.find(query), req.query).paginating();

        // ✅ MANEJO DEL SORT
        let sortOption = "-createdAt";
        if (sort && sort === "-createdAt") {
            sortOption = "-createdAt";
        }

        const posts = await features.query
            .sort(sortOption)
            .populate("user likes", "avatar username fullname mobile presentacion story:website address followers")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password",
                },
            });

        res.json({
            msg: "Success!",
            result: posts.length,
            posts,
        });
    } catch (err) {
        console.error("Error en getPosts:", err);
        return res.status(500).json({ msg: err.message });
    }
},

    getUserPosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({user: req.params.id}), req.query)
            .paginating()
            const posts = await features.query.sort("-createdAt")

            res.json({
                posts,
                result: posts.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id)
                .populate("user likes", "avatar username followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                });

            if (!post) return res.status(400).json({ msg: req.__('post.post_not_exist') });

            res.json({ post });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },


    viewPost: async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'ID inválido' });
            }

            const postUpdated = await Posts.findByIdAndUpdate(
                id,
                { $inc: { views: 1 } },
                { new: true }
            )
                .populate("user likes", "avatar username followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                });

            if (!postUpdated) return res.status(404).json({ msg: 'Post no encontrado' });

            res.json({ post: postUpdated }); // ✅ enviar post completo
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getPostsDicover: async (req, res) => {
        try {

            const newArr = [...req.user.following, req.user._id]

            const num  = req.query.num || 9

            const posts = await Posts.aggregate([
                { $match: { user : { $nin: newArr } } },
                { $sample: { size: Number(num) } },
            ])

            return res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletePost: async (req, res) => {
        try {
            const postId = req.params.id;
            const userId = req.user._id;
    
            // 🔷 VERIFICAR SI EL USUARIO ES EL DUEÑO O ADMIN
            const post = await Posts.findById(postId);
            
            if (!post) {
                return res.status(404).json({msg: 'Post not found'});
            }
    
            // Permitir eliminar si es el dueño O admin
            if (post.user.toString() !== userId.toString() && req.user.role !== 'admin') {
                return res.status(403).json({msg: 'Not authorized to delete this post'});
            }
    
            // 🔷 GUARDAR IDs DE COMMENTS Y LIKES ANTES DE ELIMINAR
            const commentsToDelete = post.comments || [];
            const likesToCleanup = post.likes || [];
    
            // 🔷 ELIMINAR EL POST
            await Posts.findByIdAndDelete(postId);
    
            // 🔷 LIMPIAR DATOS RELACIONADOS
            if (commentsToDelete.length > 0) {
                await Comments.deleteMany({_id: {$in: commentsToDelete}});
            }
    
            // 🔷 OPCIONAL: Limpiar likes de usuarios
            if (likesToCleanup.length > 0) {
                await Users.updateMany(
                    {_id: {$in: likesToCleanup}},
                    {$pull: {likes: postId}}
                );
            }
    
            // 🔷 OPCIONAL: Eliminar de posts guardados
            await Users.updateMany(
                {saved: postId},
                {$pull: {saved: postId}}
            );
    
            res.json({
                msg: 'Post deleted successfully!',
                deletedPostId: postId
            });
    
        } catch (err) {
            console.error('Error in deletePost:', err);
            return res.status(500).json({msg: err.message});
        }
    },
    savePost: async (req, res) => {
        try {
            const user = await Users.find({_id: req.user._id, saved: req.params.id})
            if(user.length > 0) return res.status(400).json({msg: "You saved this post."})

            const save = await Users.findOneAndUpdate({_id: req.user._id}, {
                $push: {saved: req.params.id}
            }, {new: true})

            if(!save) return res.status(400).json({msg: 'This user does not exist.'})

            res.json({msg: 'Saved Post!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    unSavePost: async (req, res) => {
        try {
            const save = await Users.findOneAndUpdate({_id: req.user._id}, {
                $pull: {saved: req.params.id}
            }, {new: true})

            if(!save) return res.status(400).json({msg: 'This user does not exist.'})

            res.json({msg: 'unSaved Post!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getSavePosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({
                _id: {$in: req.user.saved}
            }), req.query).paginating()

            const savePosts = await features.query.sort("-createdAt")

            res.json({
                savePosts,
                result: savePosts.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = postCtrl