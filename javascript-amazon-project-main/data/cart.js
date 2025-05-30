    //  Using modules to combine all the files together into 1 big file 

    //  Create a Module
    // 1. Create a file
    // 2. Don't load the file with <scripts>
    // Any variables we create inside the file, will be contained inside the file. 

    // Get a Variable Out of a File
    // 1. Add type="module" attribute
    // 2. Export
    // 3. Import

    //type="module" attribute (script file in amazon.html)
    // Lets this file get variables out of other files.
    // export in cart.js
    // import in amazon.js


export const cart =[];