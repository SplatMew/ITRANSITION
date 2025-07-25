const args = process.argv.slice(2);

if(args.length === 0){
    console.log();
    return;

}
else if (args.length === 1){

    console.log(args[0]);
    return;

}
else{

    let longest = '';
    const first = args[0];

    for (let i = 0; i < first.length; i++){
        for (let j = i + 1; j <= first.length; j++){
            const sub = first.slice(i,j);

            let foundInAll = true;
            for(let k = 1; k < args.length; k++){
                if(!args[k].includes(sub)){
                    foundInAll = false;
                    break;
                }
            }

            if(foundInAll && sub.length > longest.length){
                longest = sub;
            }
        }
    }
    console.log(longest);
}