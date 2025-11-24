// En utils/imageUpload.js
export const checkImage = (files, currentImagesCount = 0) => {
  let err = "";
  if (!files || files.length === 0) return err = "No files selected.";

  // ✅ Límite de cantidad (2 imágenes máximo por post)
  const maxImages = 2;
  if (files.length > maxImages) {
    err = `Solo puedes subir máximo ${maxImages} imágenes.`;
    return err;
  }

  // ✅ Límite total considerando imágenes existentes
  if (currentImagesCount + files.length > maxImages) {
    err = `Máximo ${maxImages} imágenes permitidas por post.`;
    return err;
  }

  const allowedExtensions = ['jpeg', 'jpg', 'png', 'webp'];
  const blockedExtensions = ['txt', 'pdf', 'doc', 'exe'];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // ✅ Límite de tamaño (2 MB máximo por imagen)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      err = "Cada imagen debe ser menor a 2MB.";
      return err;
    }

    // ✅ Validación de formato
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      err = "Formatos permitidos: JPG, PNG, WebP.";
      return err;
    }

    if (blockedExtensions.includes(fileExtension)) {
      err = "Tipo de archivo no permitido.";
      return err;
    }
  }

  return err;
};

 
export const imageUpload = async (images) => {
  console.log('🟡 INICIANDO imageUpload - Total imágenes:', images?.length || 0);

  let imgArr = [];
  let uploadedCount = 0;

  for(const [index, item] of images.entries()){ 
      console.log(`\n🔄 Procesando imagen ${index + 1}:`, item);

      // ✅ SI ES BLOB URL (IMAGEN NUEVA) - CONVERTIR A FILE
      if (item.url && item.url.startsWith('blob:') && !item.isExisting) {
          console.log('🔄 Convirtiendo blob URL a archivo...');
          
          try {
              // 1. Convertir blob URL a File
              const response = await fetch(item.url);
              if (!response.ok) throw new Error('No se pudo acceder al blob');
              
              const blob = await response.blob();
              const file = new File([blob], item.name || `image-${Date.now()}.jpg`, { 
                  type: blob.type || 'image/jpeg' 
              });

              console.log('📁 Blob convertido a File:', file.name, `${(file.size / 1024).toFixed(2)} KB`);

              // 2. Subir a Cloudinary
              const formData = new FormData();
              formData.append("file", file);
              formData.append("upload_preset", "vetementsdjamel");
              formData.append("cloud_name", "dfjipgj2o");

              console.log('🌐 Enviando a Cloudinary...');
              
              const res = await fetch("https://api.cloudinary.com/v1_1/dfjipgj2o/image/upload", {
                  method: "POST",
                  body: formData
              });

              if (!res.ok) {
                  const errorText = await res.text();
                  throw new Error(`Cloudinary error: ${res.status} - ${errorText}`);
              }

              const data = await res.json();
              
              console.log('✅ UPLOAD EXITOSO a Cloudinary:', {
                  public_id: data.public_id,
                  url: data.secure_url,
                  formato: data.format
              });

              imgArr.push({
                  public_id: data.public_id, 
                  url: data.secure_url
              });
              uploadedCount++;

          } catch (error) {
              console.error(`❌ ERROR procesando imagen ${index + 1}:`, error.message);
              continue;
          }
      }
      // ✅ SI YA ES IMAGEN DE CLOUDINARY
      else if (item.isExisting && item.url && item.url.includes('cloudinary.com')) {
          console.log('✅ Imagen ya en Cloudinary:', item.public_id);
          imgArr.push({
              public_id: item.public_id,
              url: item.url
          });
          uploadedCount++;
      }
      else {
          console.warn('⚠️ Imagen no procesable, saltando:', item);
      }
  }

  console.log('\n📊 RESUMEN FINAL:');
  console.log('✅ Subidas a Cloudinary:', uploadedCount);
  console.log('📦 Array resultante:', imgArr);
  
  return imgArr;
}