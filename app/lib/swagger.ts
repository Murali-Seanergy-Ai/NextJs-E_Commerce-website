import { createSwaggerSpec } from "next-swagger-doc";
import path from "path";

export const getApiDoc = async ()=>{
    const spec = createSwaggerSpec({
        apiFolder:"app/api", //define the folder under app folder
        definition:{
            openapi: '3.0.0',
            info:{
                title:"E-commerce API Documetation",
                version:'1.0'
            },
            components:{
                securitySchemes:{
                    bearerAuth:{
                        type:"http",
                        scheme:'bearer',
                        bearerFormat:"JWT"
                    }
                }
            },
            security:[  //All APIs require authenticationThis is global security. 
                {
                   bearerAuth:[]  //Empty array means: no additional scopes are required. 
                }
            ],
            servers :[{url:'http://localhost:3000'}]

        },
        apis:[
           path.join(process.cwd(), "app/api-doc/api/*.swagger.js")
        ]

    })
    return spec
}