// src/config/CategoryFields.js
// 📦 CONFIGURACIÓN COMPLETA Y CORRECTA DE CAMPOS

// 🔹 OBJETO PRINCIPAL
const Category = {
    // 🔹 FUNCIÓN: Obtener valor de un campo por path (post.telephone.modelo, etc.)
    getFieldValue: (post, path) => {
      if (!post || !path) return null;
      
      const parts = path.split('.');
      let value = post;
      
      for (const part of parts) {
        if (value && value[part] !== undefined && value[part] !== null) {
          value = value[part];
        } else {
          return null;
        }
      }
      
      return value;
    },
    
    // 🔹 FUNCIÓN: Verificar si un campo tiene valor
    hasFieldValue: function(post, path) {
      const value = this.getFieldValue(post, path);
      
      if (value === null || value === undefined || value === '') {
        return false;
      }
      
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      
      return true;
    },
    
    // 🔹 CONFIGURACIÓN DE CAMPOS POR CATEGORÍA
    categoryFields: {
      // 🎯 CAMPOS PARA TELEPHONES (vienen de post.telephone)
      telephones: {
        name: "Téléphones",
        icon: "📱",
        color: "#3b82f6",
        
        fields: [
          // 📱 Información básica
          { name: "modelo", label: "Modèle", path: "telephone.modelo" },
          { name: "referencia", label: "Référence", path: "telephone.referencia" },
          { name: "capacite", label: "Capacité", path: "telephone.capacite" },
          { name: "colortelefono", label: "Couleur", path: "telephone.colortelefono" },
          { name: "copie", label: "Copie", path: "telephone.copie" },
          { name: "type_memoire", label: "Type de mémoire", path: "telephone.type_memoire" },
          
          // 📱 Especificaciones técnicas
          { name: "os", label: "Système d'exploitation", path: "telephone.os" },
          { name: "appareil", label: "Appareil", path: "telephone.appareil" },
          { name: "camerafrontal", label: "Caméra frontale", path: "telephone.camerafrontal" },
          { name: "gigas", label: "RAM", path: "telephone.gigas" },
          { name: "doublepuces", label: "Double SIM", path: "telephone.doublepuces" },
          { name: "bateria", label: "Batterie", path: "telephone.bateria" },
          { name: "charging_type", label: "Type de charge", path: "telephone.charging_type" },
          
          // 📱 Accesorios
          { name: "compatibiliteAccessoire", label: "Compatibilité accessoire", path: "telephone.compatibiliteAccessoire" },
          { name: "capaciteCarte", label: "Capacité carte", path: "telephone.capaciteCarte" },
          { name: "puissanceChargeur", label: "Puissance chargeur", path: "telephone.puissanceChargeur" },
          { name: "typeConnexionAudio", label: "Connexion audio", path: "telephone.typeConnexionAudio" },
          { name: "typeConnexionFixFax", label: "Connexion fixe/fax", path: "telephone.typeConnexionFixFax" },
          { name: "connectiviteManette", label: "Connectivité manette", path: "telephone.connectiviteManette" },
          { name: "dureeOffre", label: "Durée offre", path: "telephone.dureeOffre" },
          { name: "etatPiece", label: "État pièce", path: "telephone.etatPiece" },
          { name: "capacitePowerbank", label: "Capacité powerbank", path: "telephone.capacitePowerbank" },
          { name: "tailleEcranWatch", label: "Taille écran montre", path: "telephone.tailleEcranWatch" },
          { name: "fonctionnalitesWatch", label: "Fonctionnalités montre", path: "telephone.fonctionnalitesWatch" },
          { name: "compatibiliteProtection", label: "Compatibilité protection", path: "telephone.compatibiliteProtection" },
          { name: "compatibiliteStylet", label: "Compatibilité stylet", path: "telephone.compatibiliteStylet" },
          { name: "caracteristiquesStylet", label: "Caractéristiques stylet", path: "telephone.caracteristiquesStylet" },
          { name: "compatibilite", label: "Compatibilité", path: "telephone.compatibilite" },
          { name: "tailleEcranTablette", label: "Taille écran tablette", path: "telephone.tailleEcranTablette" },
          { name: "etatTablette", label: "État tablette", path: "telephone.etatTablette" },
          { name: "marcacelular", label: "Marque cellulaire", path: "telephone.marcacelular" },
          { name: "marcaVR", label: "Marque VR", path: "telephone.marcaVR" }
        ],
        
        subCategories: {
          "Smartphones": { icon: "📱", name: "Smartphones" },
          "Telephones": { icon: "📞", name: "Téléphones" },
          "Tablettes": { icon: "📟", name: "Tablettes" },
          "Smartwatchs": { icon: "⌚", name: "Smartwatches" },
          "ChargeursCables": { icon: "🔌", name: "Chargeurs & Câbles" },
          "Powerbanks": { icon: "🔋", name: "Power Banks" },
          "EcouteursSon": { icon: "🎧", name: "Écouteurs & Son" },
          "ProtectionAntichoc": { icon: "🛡️", name: "Protections" },
          "SupportsStabilisateurs": { icon: "📸", name: "Supports" },
          "Manettes": { icon: "🎮", name: "Manettes" },
          "VR": { icon: "🕶️", name: "Réalité Virtuelle" },
          "Stylets": { icon: "✏️", name: "Stylets" },
          "CartesMemoire": { icon: "💾", name: "Cartes Mémoire" },
          "FixFax": { icon: "📞", name: "Téléphones Fixes" },
          "Baffle": { icon: "🔊", name: "Haut-parleurs" },
          "StationChargement": { icon: "⚡", name: "Stations de Charge" },
          "Coques": { icon: "📱", name: "Coques" },
          "ProtectionEcran": { icon: "🖥️", name: "Protections Écran" },
          "Accessoires": { icon: "🔧", name: "Accessoires" }
        }
      },
      
      // 👕 CAMPOS PARA VETEMENTS (vienen de post.vetement)
      vetements: {
        name: "Vêtements",
        icon: "👕",
        color: "#10b981",
        
        fields: [
          // 👕 Información básica
          { name: "genero", label: "Genre", path: "vetement.genero" },
          { name: "color", label: "Couleur", path: "vetement.color" },
          { name: "talla", label: "Taille", path: "vetement.talla" },
          { name: "material", label: "Matériau", path: "vetement.material" },
          { name: "estilo", label: "Style", path: "vetement.estilo" },
          { name: "temporada", label: "Saison", path: "vetement.temporada" },
          { name: "ocasion", label: "Occasion", path: "vetement.ocasion" },
          
          // 👕 Campos específicos
          { name: "edadBebes", label: "Âge bébé", path: "vetement.edadBebes" },
          { name: "tipopiedra", label: "Type de pierre", path: "vetement.tipopiedra" },
          { name: "tipomaterialbijoux", label: "Matériau bijou", path: "vetement.tipomaterialbijoux" },
          { name: "alturatacon", label: "Hauteur talon", path: "vetement.alturatacon" },
          { name: "tipodecierre", label: "Type de fermeture", path: "vetement.tipodecierre" },
          { name: "formadepunta", label: "Forme pointe", path: "vetement.formadepunta" },
          { name: "tipodesuela", label: "Type de semelle", path: "vetement.tipodesuela" },
          { name: "tipodelente", label: "Type de lentille", path: "vetement.tipodelente" },
          { name: "anchopuente", label: "Largeur pont", path: "vetement.anchopuente" },
          { name: "langitudpatilla", label: "Longueur branche", path: "vetement.langitudpatilla" },
          { name: "movimientoreloj", label: "Mouvement montre", path: "vetement.movimientoreloj" },
          { name: "materialcorrea", label: "Matériau bracelet", path: "vetement.materialcorrea" },
          { name: "resistenciaagua", label: "Résistance eau", path: "vetement.resistenciaagua" },
          { name: "funcionalidades", label: "Fonctionnalités", path: "vetement.funcionalidades" },
          { name: "tiporeloj", label: "Type montre", path: "vetement.tiporeloj" },
          { name: "correa", label: "Sangle", path: "vetement.correa" },
          { name: "tallasaco", label: "Taille sac", path: "vetement.tallasaco" },
          { name: "tipodsangle", label: "Type de sangle", path: "vetement.tipodsangle" },
          { name: "tipodelabata", label: "Type de blouse", path: "vetement.tipodelabata" },
          { name: "sectordetrabajo", label: "Secteur travail", path: "vetement.sectordetrabajo" }
        ],
        
        subCategories: {
          "ropahombre": { icon: "👔", name: "Homme" },
          "ropamujer": { icon: "👗", name: "Femme" },
          "bijoux": { icon: "💎", name: "Bijoux" },
          "reloj": { icon: "⌚", name: "Montres" },
          "gafas": { icon: "👓", name: "Lunettes" },
          "bebes": { icon: "👶", name: "Bébés" },
          "zapatoshombre": { icon: "👞", name: "Chaussures Homme" },
          "zapatosmujer": { icon: "👠", name: "Chaussures Femme" },
          "garcons": { icon: "👦", name: "Garçons" },
          "filles": { icon: "👧", name: "Filles" },
          "ropaprofesional": { icon: "👨‍⚕️", name: "Professionnel" },
          "sacvalise": { icon: "💼", name: "Sacs & Valises" }
        }
      }
    },
    
    // 🔹 CAMPOS COMUNES A TODAS LAS CATEGORÍAS (vienen de post)
    commonFields: [
      { name: "title", label: "Titre", path: "title" },
      { name: "description", label: "Description", path: "description" },
      { name: "content", label: "Contenu", path: "content" },
      { name: "price", label: "Prix", path: "price" },
      { name: "tipodemoneda", label: "Devise", path: "tipodemoneda" },
      { name: "tipoventa", label: "Type de vente", path: "tipoventa" },
      { name: "telefono", label: "Téléphone", path: "telefono" },
      { name: "etat", label: "État général", path: "etat" },
      { name: "wilaya", label: "Wilaya", path: "wilaya" },
      { name: "commune", label: "Commune", path: "commune" },
      { name: "tipoArticulo", label: "Type d'article", path: "tipoArticulo" },
      { name: "marca", label: "Marque", path: "marca" },
      { name: "subCategory", label: "Sous-catégorie", path: "subCategory" }
    ],
    
    // 🔹 FUNCIÓN AUXILIAR: Obtener configuración de categoría
    getCategoryConfig: function(category) {
      return this.categoryFields[category] || this.categoryFields.vetements;
    },
    
    // 🔹 FUNCIÓN AUXILIAR: Obtener campos filtrados para un post
    getFieldsForPost: function(post) {
      const category = post?.category || 'vetements';
      const config = this.getCategoryConfig(category);
      
      return {
        common: this.commonFields.filter(field => this.hasFieldValue(post, field.path)),
        specific: config.fields.filter(field => this.hasFieldValue(post, field.path)),
        config: config
      };
    },
    
    // 🔹 FUNCIÓN AUXILIAR: Obtener info de subcategoría
    getSubCategoryInfo: function(post) {
      if (!post) return { icon: "📦", name: "Article", color: "#666" };
      
      const category = post.category || 'vetements';
      const config = this.getCategoryConfig(category);
      const subCategory = post.subCategory;
      
      if (subCategory && config.subCategories && config.subCategories[subCategory]) {
        return config.subCategories[subCategory];
      }
      
      return {
        icon: config.icon,
        name: config.name,
        color: config.color
      };
    }
  };
  
  // 🔹 EXPORT DEFAULT ÚNICO
  export default Category;