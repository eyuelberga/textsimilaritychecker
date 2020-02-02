function wordCountMap(str){
    let words = str.split(' ');
    let wordCount = {};
    words.forEach((w)=>{
        wordCount[w] = (wordCount[w] || 0) +1;

    });
return wordCount;
}
function addWordsToDictionary(wordCountmap, dict){
    for(let key in wordCountmap){
        dict[key] = true;
    }
}
function wordMapToVector(map,dict){
    let wordCountVector = [];
    for (let term in dict){
        wordCountVector.push(map[term] || 0);
    }
    return wordCountVector;
}
function dotProduct(vecA, vecB){
    let product = 0;
    for(let i=0;i<vecA.length;i++){
        product += vecA[i] * vecB[i];
    }
    return product;
}
function magnitude(vec){
    let sum = 0;
    for (let i = 0;i<vec.length;i++){
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}
function cosineSimilarity(vecA,vecB){
    return dotProduct(vecA,vecB)/ (magnitude(vecA) * magnitude(vecB));
}

function textCosineSimilarity(txtA,txtB){
    const wordCountA = wordCountMap(txtA);
    const wordCountB = wordCountMap(txtB);
    let dict = {};
    addWordsToDictionary(wordCountA,dict);
    addWordsToDictionary(wordCountB,dict);
    const vectorA = wordMapToVector(wordCountA,dict);
    const vectorB = wordMapToVector(wordCountB,dict);
    return cosineSimilarity(vectorA, vectorB);
}

function getSimilarityScore(val){
    return Math.round(val * 100)
}

function checkSimilarity(){
    const text1 = $('#text1').val();
    const text2 = $('#text2').val();
    const similarity = getSimilarityScore(textCosineSimilarity(text1,text2));
    $("#similarity").text(similarity+"%");
}