// UYARI: Bu dosya sadece SSR/API Routes destekleyen deploymentlarda çalışır.
// Static export (`output: 'export'`) kullanıldığında bu API çalışmayacaktır.
// Demo talep formunuzu harici bir API ile entegre etmelisiniz.

// Not: Netlify'da deploy edildiğinde, client-side'dan AJAX çağrıları yapmak için
// form işlemlerinizi Netlify Functions veya başka bir hizmete taşımanız gerekecektir.

// Bu dosya, static export yapılandırmasında derleme hatası vermemesi için dummy export içerir.
export const dynamic = 'force-static';

export async function GET() {
  return new Response(
    JSON.stringify({ 
      message: 'Static export modunda API Routes desteklenmez. Lütfen Netlify Functions kullanın.' 
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}

export async function POST() {
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Demo talebiniz başarıyla alındı (statik mock yanıt)' 
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
} 