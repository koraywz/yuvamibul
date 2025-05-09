import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        //BİLGİLER
        info: {
            title: 'PawFinder API',
            version: '1.0.0',
            description: 'Hayvan sahiplendirme platformu API dokümantasyonu',
        },
        //Sunucu bilgileri
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Geliştirme sunucusu',
            },
        ],
        //API’de kullanılacak kimlik doğrulama yöntemlerini belirtiyoruz
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',//HTTP kimlik doğrulama yöntemi
                    scheme: 'bearer',//Bearer token kimlik doğrulama yöntemi
                    bearerFormat: 'JWT',//Token formatı JWT 
                },
            },
        },
    },
    apis: ['./app.js', './docs/api-docs.js'], // API rotalarının ve dokümantasyonun bulunduğu dosyalar
};

const specs = swaggerJsdoc(options);//Yukarıda belirtilen options ile swagger yapısını oluşturuyoruz.

export default specs; //swagger yapısını dışarıdan kullanabilmek için export ediyoruz. 