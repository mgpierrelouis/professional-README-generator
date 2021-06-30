const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateReadme = require("./utils/generateMarkdown");

// TODO: Include packages needed for this application
const writeFileAsync = util.promisify(fs.writeFile);


// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'What is the title for your project?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Describe your project',
        name: 'description',
    },
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'GitHub',
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
    },
    {
        type: 'list',
        message: 'What licenses will you be using?',
        name: 'license',
        choices: [
            "MIT",
            "Unlicense",
            "Apache 2.0",
            "GNU v3",
            "BSD 3-Clause",
            "Mozilla Public License 2.0",
        ]
    },
    {
        type: 'input',
        message: 'What command will be used to install dependencies?',
        name: 'installation',
        default: 'npm i',
    },
    {
        type: 'input',
        message: 'What command will be used to run tests?',
        name: 'installation',
        default: 'npm run test',
    },
    {
        type: 'input',
        message: 'Provide information about how the repository works',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'Provide information about how to contribute to the repository',
        name: 'contributing',
    },
    
    
];

const userChoice = () => {
    return inquirer
        .prompt(questions);
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return writeFileAsync(fileName, data);

}

// TODO: Create a function to initialize app
async function init() {
        try {
            console.log("Please answer a few questions to help generate a professional README");
            const answers = await userChoice();
            const readmeContent = generateReadme(answers);
            await writeToFile('./output/README.md');
            console.log("README.md generated in output folder");

    } catch (err) {
        console.error("An error has occurred in creating your README.md");
        console.log(err);
    }
}

// Function call to initialize app
init();
