// #!/usr/bin/env node

 let fs = require("fs");

let path=require('path');

let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let addnames = [];

for(let i=0 ; i<arguments.length ; i++) {
    if(arguments[i].startsWith("-")) {
        flags.push(arguments[i]);
     } else if(arguments[i].endsWith(".txt")) {
        filenames.push(arguments[i]);
     
     }  else{
        addnames.push(arguments[i]);
    }
}

function removeAll(string, removalData) {
    return string.split(removalData).join("");
}

function addSequence(content){
   let contentArr=content.split("\n");
   for(let i=0;i<contentArr.length;i++){
       contentArr[i]=(i+1)+" "+contentArr[i];
   }
   return contentArr;
}
for(let file of filenames) {
    let fileData = fs.readFileSync(file,"utf-8");
     for(let flag of flags) {

         if(flag == "-rs") {         
            
            fileData = removeAll(fileData," ");
            
        }
        if(flag == "-rn") {
            fileData = removeAll(fileData, "\r\n")
            
        }
        if(flag=="-s"){
            fileData = addSequence(fileData);
            
        }
        
    }
    console.log(fileData);
}

for(let add of addnames)
 {

    let input=add;

    for(let flag of flags){
        if(flag == "-copyd"){

            let allEntities=fs.readdirSync(input);
            console.log("all entities are ",allEntities);
            
            let content="";
        
            for(let i=0;i<allEntities.length;i++){
            let entityName=allEntities[i];
            // console.log(entityName);
            let eName=path.join(input,entityName);
            let statusObj=fs.lstatSync(eName);
            // console.log(stats);
            let isFile=statusObj.isFile();
            if(isFile){
                let extName=path.extname(eName);
                if(extName=='.txt'){
                    content+=fs.readFileSync(eName);
                }
            }
        }
        fs.writeFileSync('newfile.txt',content);
        
        }
    }
 }
