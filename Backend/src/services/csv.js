const csv = require('csv-parser');
const readableStream = require('stream').Readable;


exports.tratar_csv = function(csvv,headers){ 
    const stream = new readableStream();
    const fileData = csvv.buffer.toString('utf8');
    console.log(fileData)
    const results = [];
    
   
    console.log()
    stream.push(fileData);
    console.log(stream)
    stream.push(null);
    console.log(stream)

    stream.pipe( csv({ separator: ',',headers:headers, skipLines:1 }))
    .on('data', (data) => {
        results.push(data)
        
    })
    .on('end', () => {
        // Término da leitura do arquivo CSV  
        
    });
    
    return results


}