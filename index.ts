import inquirer from "inquirer"
import showBanner from "node-banner"



(async () => {
    await showBanner('ATM Machine', 'Select you require transaction');
})();


let againTransaction=[
    {
        name: "again",
        type: "confirm",
        message: "Do you want another transaction"
    }
]

async function ATM() {
    let condition=true
    while (condition) {

        let answers = await inquirer.prompt([
            {
                name: "userID",
                type: "input",
                message: "Enter your ID"
            },
            {
                name: "userPin",
                type: "number",
                message: "Enter your Pin"
            },
            {
                name: "accountType",
                type: "list",
                choices: ["Current", "Saving"],
                message: "Select your Account"
            },
            {
                name: "transactionType",
                type: "list",
                choices: ["Fast Cash", "Withdraw", "Balance Inquire"],
                message: "Select your Transaction Type",
                when: (answers) => answers.accountType
            },
            {
                name: "amount",
                type: "list",
                choices: [1000, 3000, 5000, 10000, 20000, 50000],
                message: "Select your Amount",
                when: (answers) => answers.transactionType === "Fast Cash"
            },
            {
                name: "amount",
                type: "number",
                message: "Enter your Amount",
                when: (answers) => answers.transactionType === "Withdraw"
            },
            {
                name: "CheckBalance",
                type: "number",
                when: (answers) => answers.transactionType === "accountBalance"
            }
        ]);

        
        if (answers.userID && answers.userPin) {
            // const balane = Math.floor(Math.random()* 10000)
            const balance = 20000
            console.log(balance);

            if (answers.transactionType === "accountBalance") {
                console.log(`This is your current balance: ${balance}`);
            } else if (answers.transactionType === "Fast Cash" || answers.transactionType === "Withdraw") {
                const enterAmount = answers.amount;
                if (balance >= enterAmount) {
                    const remaining = balance - enterAmount;
                    console.log(`This is your remaining amount: ${remaining}`);
                } else {
                    console.log("Insufficient Balance");
                }
            }
        }
        console.log(answers);

        let {again} =await inquirer.prompt(againTransaction)
        condition= again
    }
}
setTimeout(() => {
    ATM()
}, 2000);

