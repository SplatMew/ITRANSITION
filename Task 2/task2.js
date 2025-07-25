const fs = require('fs');
const path = require('path');
const { SHA3 } = require('sha3');

function processTask(){
    const extractDir = './task2';

    const hashes = [];
    const files = fs.readdirSync(extractDir);  // ← CHANGED THIS LINE

    for (const file of files){
        const filePath = path.join(extractDir, file);
        
        // It's good practice to check if it's actually a file
        if (fs.statSync(filePath).isFile()) {
            const fileBuffer = fs.readFileSync(filePath);
            const hash = new SHA3(256);
            hash.update(fileBuffer);
            const hexHash = hash.digest('hex');
            console.log(`File: ${file}, Hash: ${hexHash}`);
            hashes.push(hexHash);
        }
    }

    hashes.sort((a,b) => b.localeCompare(a));
    console.log('\nSorted hashes (descending): ');
    hashes.forEach(h => console.log(h));

    const joinedHashes = hashes.join('');

    const email = 'angel.torres@uabc.edu.mx';
    const concatenated = joinedHashes + email.toLowerCase();

    const finalHash = new SHA3(256);
    finalHash.update(concatenated);
    const result = finalHash.digest('hex');
    
    console.log('\nFinal SHA3-256 hash:', result);
    console.log('\nCommand to send:');
    console.log(`!task2 ${email} ${result}`);
}

processTask();