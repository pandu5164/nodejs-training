const person = {
    name: 'Pavan Kmar Z',
    age: 32,
    greet: () => { // arrow fundtion this refers to global scope and not specific to person obj, so it gives undefined while accessing this.name
        console.log("Hi I'm", this.name);
    },
    greet1: function() {
        console.log("Hi I'm", this.name);
    },
    greet2() {
        console.log("Hi I'm", this.name);
    }
}
person.greet();
person.greet1();
person.greet2();

const { name, age } = person; // destructing obj.

console.log('destructred name ', name);

const printName = (data) => {
    return data.name
}

//above function can be optimized to

const newPrintName = ({name}) => { //it pickts name ky from passed/ incoming obj. by destructuring
    return name;
}

console.log('name is ', printName(person));
console.log('name is ', newPrintName(person));

const copipedPerson = {...person}; // spread operator

const hobbies = ['pavan', 'subbu', 'shannu'];

const [hobby1, hobby2, hibby3] = hobbies; //array destructuring
console.log('hobby1', hobby1);

for(let hobby of hobbies) {
    console.log(hobby)
}

const hobbyMap = hobbies.map(hobby => 'Name is: ' +hobby); // map create a new/modified array out of mapped array with out changing the old/ mapped array
const oldHobby = hobbies;
console.log('hobiies outputs', {hobbyMap, oldHobby});

// Objects and arrays are called as reference types. - which stores address pointing at place and memory where the array is stored. So, pointer won't cahnge by addinga  new element

var copiedArray = hobbies.slice(); // makes a copy if no arguments are passed. arguemnts are passed to sprcify range to be copied

var copiedArray1 = [...hobbies]; // spread operator

console.log('copiedArr', {copiedArray, copiedArray1});
console.log('copiedObject', copipedPerson);

const toArray = (arg1, arg2, arg3) => { //without rest operator
    return [arg1, arg2, arg3];
}

const toArray1 = (...args) => { //rest operator
    return args;
}

console.log('toArray', toArray(1,2,3));
console.log('toArray1', toArray1(1,2,3,4));

