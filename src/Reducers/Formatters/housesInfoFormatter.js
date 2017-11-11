import {Map, OrderedMap} from 'immutable';


function getDaysData(days) {
    let transactions = [];
    let creditDiagram = new OrderedMap({});
    let debitDiagram = new OrderedMap({});
    if (days) {
        for (let i in days) {
            for (let t in days[i].transactions) {
                let transaction = days[i].transactions[t]
                if (transaction.type === 'credit') {
                    let current = creditDiagram.get(transaction.category) || 0;
                    creditDiagram = creditDiagram.set(transaction.category, parseInt(current) + parseInt(transaction.sum));
                }
                if (transaction.type === 'debit') {
                    let current = debitDiagram.get(transaction.category) || 0;
                    debitDiagram = debitDiagram.set(transaction.category, parseInt(current) + parseInt(transaction.sum));
                }

                transactions.push(transaction)
            }
        }
    }

    return {transactions, creditDiagram: creditDiagram.sort().reverse(), debitDiagram: debitDiagram.sort().reverse()};
}

export function getCurrentDate(info) {
    return {
        year: info.bills[0]['year'],
        month: info.bills[0]['months'][0]['month']
    }
}


export function formatLists(info) {
    let bills = new OrderedMap({});

    for (let i in info.bills) {
        let year   = info.bills[i]['year']
        let months = info.bills[i]['months']
        bills = bills.set( year, new OrderedMap({}) );

        for (let m in months) {
            let month = months[m]['month']

            bills = bills.setIn([year, month], new Map({ ...getDaysData(months[m]['days']) }))

        }
    }
    return bills
}
