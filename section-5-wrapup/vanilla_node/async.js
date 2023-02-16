//synchronous code starts
console.log('Hai');
console.log('Hello');
//synchronous code ends

setTimeout(() => { // async code
    console.log("It's time for async code");
},1000);

// simple nested async calls example

const fetchData = callback => {
    setTimeout(() => {
        callback('Done!');
    },1500)
}

setTimeout(() => {
    fetchData(text => {
        // setTimeout(() => {
            console.log('text is', text)
        // },500);
    });
});

// Promises cam into picture for nested dependencies

const fetch = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done by promise!');
        },2000);
    });
    return promise;
}

setTimeout(() => {
    fetch()
    .then(text => {
        console.log('promise text is :', text);
        // return fetchData().then(text2 => { // is we want to call multiple nest calls - not a proper way
        //     console.log('text 2 is ', txt2);
        // });
        return fetch(); // calling 2nd promise
    })
    .then(txt2 => {
        console.log('promise txt2 is :', txt2); // called for 2nd promise
    });
}, 1);

