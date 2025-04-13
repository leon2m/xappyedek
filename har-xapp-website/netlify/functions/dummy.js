// Netlify Functions testi için basit bir fonksiyon
// Sadece Netlify build sürecinde hata vermemesi için eklendi

exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: "AR Solutions Netlify Function çalışıyor",
      status: "success",
      timestamp: new Date().toISOString() 
    })
  };
}; 