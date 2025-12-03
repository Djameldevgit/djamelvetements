const mongoose = require('mongoose')
const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/userModel')
const Vetement = require('../models/CategoriesModel/vetementModel')
const Telephone = require('../models/CategoriesModel/TelephoneModel')
const cloudinary = require('cloudinary').v2

// Configurar Cloudinary
cloudinary.config({
    cloud_name: 'dfjipgj2o',
    api_key: '213981915435275',
    api_secret: 'wv_IiCM9zzhdiWDNXXo8HZi7wX4'
})

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

            // ✅ VALIDACIONES BÁSICAS
            if (!images || images.length === 0) {
                return res.status(400).json({msg: "Veuillez ajouter au moins une photo."})
            }

            if (!postData || !postData.category) {
                return res.status(400).json({msg: "Les données du post sont incomplètes."})
            }

            if (!postData.subCategory) {
                return res.status(400).json({msg: "La sous-catégorie est requise."})
            }

            // ✅ VALIDAR CATEGORÍAS PERMITIDAS
            const validCategories = ['vetements', 'telephones'];
            if (!validCategories.includes(postData.category)) {
                return res.status(400).json({ 
                    msg: `Catégorie invalide. Utilisez: ${validCategories.join(' ou ')}` 
                })
            }

            // ✅ DETERMINAR EL MODELO ESPECÍFICO SEGÚN CATEGORÍA - CORREGIDO
            let SpecificModel, modelRef;
            
            if (postData.category === 'vetements') {
                SpecificModel = Vetement;
                modelRef = 'vetement';
            } else if (postData.category === 'telephones') {
                SpecificModel = Telephone;
                modelRef = 'telephone';
            } else {
                return res.status(400).json({msg: "Catégorie non reconnue."})
            }

            console.log(`🔍 Creando post para categoría: ${postData.category}`);
            console.log(`🔍 Modelo específico: ${SpecificModel.modelName}`);
            console.log(`🔍 Referencia: ${modelRef}`);

            // ✅ VERIFICAR SI EL MODELO EXISTE
            if (!SpecificModel) {
                return res.status(500).json({msg: `Modèle ${postData.category} non trouvé`})
            }

            // ✅ CREAR MODELO ESPECÍFICO
            const newSpecific = new SpecificModel({
                ...postData,
                user: req.user._id,
                // Mantener el nombre del campo como en el modelo específico
                subCategory: postData.subCategory || postData.subCategoryType
            })
            
            console.log('🔍 Guardando modelo específico...');
            const savedSpecific = await newSpecific.save();
            console.log('✅ Modelo específico guardado:', savedSpecific._id);

            // ✅ CREAR POST BASE
            const newPost = new Posts({
                ...postData,
                images: images,
                user: req.user._id,
                [modelRef]: savedSpecific._id // ✅ REFERENCIA DINÁMICA CORRECTA
            })

            console.log('🔍 Guardando post base...');
            const savedPost = await newPost.save();
            console.log('✅ Post base guardado:', savedPost._id);

            // ✅ ACTUALIZAR REFERENCIA EN EL MODELO ESPECÍFICO
            savedSpecific.post = savedPost._id;
            await savedSpecific.save();

            console.log('✅ Referencia actualizada en modelo específico');

            // ✅ POPULATE Y RESPUESTA
            await savedPost.populate('user', 'avatar username followers');
            await savedPost.populate(modelRef);

            console.log('✅ Post populado correctamente');

            res.json({
                msg: 'Post créé avec succès!',
                newPost: {
                    ...savedPost.toObject(),
                    specificData: savedPost[modelRef] // Incluir datos específicos
                }
            })

        } catch (err) {
            console.error('❌ Error en createPost:', err)
            
            // 🔹 ERRORES ESPECÍFICOS
            if (err.name === 'ValidationError') {
                const errors = Object.values(err.errors).map(e => e.message);
                return res.status(400).json({
                    msg: 'Erreurs de validation',
                    errors
                })
            }
            
            if (err.code === 11000) {
                return res.status(400).json({msg: 'Un post similaire existe déjà.'})
            }
            
            return res.status(500).json({
                msg: 'Erreur interne du serveur',
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            })
        }
    },
    
 


    
 /*  createPost: async (req, res) => {
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
            await newPost.populate('user', 'avatar username   followers')
            res.json({
                msg: 'Post créé avec succès!',
                newPost: {
                    ...newPost._doc,
                    user: req.user
                }
            })
          
    
        } catch (err) {
            console.error('Error en createPost:', err)
            return res.status(500).json({msg: err.message})
        }
    },
  
   */

    


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
            category,        // 🆕 Categoría principal (vetements, telephones)
            subCategory,     // Subcategoría dinámica
            tipoArticulo,    // 🆕 Tipo de artículo
            limit,           // Para paginación
            page            // Para paginación
        } = req.query;

        // 🔹 INICIALIZAR QUERY
        const query = {};

        // 🔹 FILTRO POR CATEGORÍA PRINCIPAL
        if (category && category.trim() !== "") {
            const categoryValue = category.trim().toLowerCase();
            
            // Validar que sea una categoría permitida
            if (categoryValue === 'vetements' || categoryValue === 'telephones') {
                query.category = categoryValue;
            } else {
                return res.status(400).json({ 
                    msg: "Categoría no válida. Use 'vetements' o 'telephones'" 
                });
            }
        }

        // 🔹 FILTRO POR SUBCATEGORÍA
        if (subCategory && subCategory.trim() !== "") {
            const subCategoryValue = subCategory.trim();
            
            // Usar búsqueda case-insensitive
            query.subCategory = { $regex: subCategoryValue, $options: "i" };
        }

        // 🔹 FILTRO POR TIPO DE ARTÍCULO
        if (tipoArticulo && tipoArticulo.trim() !== "") {
            const tipoArticuloValue = tipoArticulo.trim();
            
            // Usar búsqueda case-insensitive
            query.tipoArticulo = { $regex: tipoArticuloValue, $options: "i" };
        }

        // 🔥 CONSOLIDACIÓN DE QUERY (para evitar conflictos con $or)
        // Si hay múltiples condiciones OR, se manejan correctamente
        if (query.$or && query.$or.length === 0) {
            delete query.$or;
        }

        console.log("🔍 Query de búsqueda:", JSON.stringify(query, null, 2));
        console.log("📊 Parámetros recibidos:", { category, subCategory, tipoArticulo, limit, page });

        // 🔥 MANTENER PAGINACIÓN CON APIfeatures
        // Clonar req.query para modificar el sort
        const queryParams = { ...req.query };
        
        // Configurar orden por defecto (más recientes primero)
        if (!queryParams.sort) {
            queryParams.sort = "-createdAt";
        }

        // Crear instancia de APIfeatures
        const features = new APIfeatures(Posts.find(query), queryParams);

        // 🔹 APLICAR PAGINACIÓN Y SORT
        features.paginating();

        // Ejecutar consulta con populación
        const posts = await features.query
            .sort(queryParams.sort)
            .populate("user likes", "avatar username mobile presentacion story website address followers")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password",
                },
            });

        // 🔹 CONTAR TOTAL DE DOCUMENTOS (para paginación)
        const totalCount = await Posts.countDocuments(query);

        // 🔹 CALCULAR PÁGINAS TOTALES
        const itemsPerPage = parseInt(limit) || 9;
        const currentPage = parseInt(page) || 1;
        const totalPages = Math.ceil(totalCount / itemsPerPage);

        console.log("📈 Resultados paginados:", {
            encontrados: posts.length,
            total: totalCount,
            paginaActual: currentPage,
            totalPaginas: totalPages,
            porPagina: itemsPerPage
        });

        res.json({
            msg: "Success!",
            result: posts.length,
            total: totalCount,
            page: currentPage,
            totalPages: totalPages,
            posts,
        });

    } catch (err) {
        console.error("❌ Error en getPosts:", err);
        return res.status(500).json({ 
            msg: "Error al obtener posts", 
            error: process.env.NODE_ENV === 'development' ? err.message : undefined 
        });
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
    updatePost: async (req, res) => {
        try {
            const { postData, images } = req.body;
    
            // 1. Obtener el post actual ANTES de actualizar
            const oldPost = await Posts.findById(req.params.id);
            if (!oldPost) {
                return res.status(400).json({msg: "Ce post n'existe pas."});
            }
    
            console.log('🔄 Actualizando post - Imágenes nuevas:', images);
            console.log('📸 Imágenes antiguas:', oldPost.images);
    
            // 2. Identificar imágenes eliminadas para borrar de Cloudinary
            const oldImageIds = oldPost.images.map(img => img.public_id).filter(Boolean);
            const newImageIds = images.map(img => img.public_id).filter(Boolean);
            
            const deletedImageIds = oldImageIds.filter(id => !newImageIds.includes(id));
    
            console.log('🗑️ Imágenes a borrar de Cloudinary:', deletedImageIds);
    
            // 3. Borrar imágenes eliminadas de Cloudinary
            if (deletedImageIds.length > 0) {
                for (const publicId of deletedImageIds) {
                    try {
                        await cloudinary.uploader.destroy(publicId);
                        console.log('✅ Imagen borrada de Cloudinary:', publicId);
                    } catch (cloudinaryErr) {
                        console.error('❌ Error borrando imagen de Cloudinary:', publicId, cloudinaryErr);
                        // Continuar aunque falle una imagen
                    }
                }
            }
    
            // 4. Actualizar el post en MongoDB
            const post = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        ...postData,
                        images: images || postData.images,
                    }
                },
                { new: true, runValidators: true }
            );
    
            // 5. Populate para obtener datos del usuario
            await post.populate('user', 'avatar username   followers');
    
            res.json({
                msg: 'Post modifié avec succès!',
                newPost: post
            });
    
        } catch (err) {
            console.error('Error en updatePost:', err);
            return res.status(500).json({msg: err.message});
        }
    },
    deletePost: async (req, res) => {
        try {
            const postId = req.params.id;
            const userId = req.user._id;
    
            // 1. VERIFICAR SI EL USUARIO ES EL DUEÑO O ADMIN
            const post = await Posts.findById(postId);
            
            if (!post) {
                return res.status(404).json({msg: 'Post not found'});
            }
    
            if (post.user.toString() !== userId.toString() && req.user.role !== 'admin') {
                return res.status(403).json({msg: 'Not authorized to delete this post'});
            }
    
            console.log('🗑️ Eliminando post y sus imágenes:', post.images);
    
            // 2. BORRAR TODAS LAS IMÁGENES DEL POST DE CLOUDINARY
            if (post.images && post.images.length > 0) {
                for (const image of post.images) {
                    if (image.public_id) {
                        try {
                            await cloudinary.uploader.destroy(image.public_id);
                            console.log('✅ Imagen borrada de Cloudinary:', image.public_id);
                        } catch (cloudinaryErr) {
                            console.error('❌ Error borrando imagen de Cloudinary:', image.public_id, cloudinaryErr);
                            // Continuar aunque falle una imagen
                        }
                    }
                }
            }
    
            // 3. GUARDAR IDs DE COMMENTS Y LIKES ANTES DE ELIMINAR
            const commentsToDelete = post.comments || [];
            const likesToCleanup = post.likes || [];
    
            // 4. ELIMINAR EL POST DE MONGODB
            await Posts.findByIdAndDelete(postId);
    
            // 5. LIMPIAR DATOS RELACIONADOS
            if (commentsToDelete.length > 0) {
                await Comments.deleteMany({_id: {$in: commentsToDelete}});
            }
    
            // 6. OPCIONAL: Limpiar likes de usuarios
            if (likesToCleanup.length > 0) {
                await Users.updateMany(
                    {_id: {$in: likesToCleanup}},
                    {$pull: {likes: postId}}
                );
            }
    
            // 7. OPCIONAL: Eliminar de posts guardados
            await Users.updateMany(
                {saved: postId},
                {$pull: {saved: postId}}
            );
    
            res.json({
                msg: 'Post deleted successfully!',
                deletedPostId: postId,
                deletedImagesCount: post.images ? post.images.length : 0
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