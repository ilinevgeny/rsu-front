import {Map, OrderedMap, List} from 'immutable';


function getDaysData(days) {
    let transactions = [];
    let creditDiagram = new OrderedMap({});
    let debitDiagram = new OrderedMap({});
    let points = {credit: new OrderedMap({}), debit: new OrderedMap({}), saldo: new OrderedMap({}), count: 0};
    let legend = new OrderedMap({
        credit: new Map({id: 'credit', title: 'Поступления', sum: 0}),
        debit: new Map({id: 'debit', title: 'Расходы', sum: 0}),
        saldo: new Map({id: 'saldo', title: 'Остаток на счете', sum: 0})
    });
    let sums = new List([]);
    let credit = 0, debit = 0, saldo = 0;

    if (days) {
        for (let i in days) {
            let dayCredit = 0, dayDebit = 0;

            for (let t in days[i].transactions) {
                let transaction = days[i].transactions[t]

                if (transaction.type === 'credit') {
                    let current = creditDiagram.get(transaction.category) || 0;
                    creditDiagram = creditDiagram.set(transaction.category, parseInt(current) + parseInt(transaction.sum));
                    dayCredit += parseInt(transaction.sum);
                }
                if (transaction.type === 'debit') {
                    let current = debitDiagram.get(transaction.category) || 0;
                    debitDiagram = debitDiagram.set(transaction.category, parseInt(current) + parseInt(transaction.sum));
                    dayDebit += parseInt(transaction.sum);
                }

                transactions.push(transaction)

            }
            if (points.count === 0) {
                sums = sums.push(days[i]['saldo_in'])
                points.saldo = points.saldo.set('0', days[i]['saldo_in'])
                points.credit = points.credit.set('0', days[i]['saldo_in'])
                points.debit = points.debit.set('0', days[i]['saldo_in'])
            }

            sums = sums.push(dayCredit).push(dayDebit).push(days[i]['saldo_out'])

            credit += dayCredit;
            debit  += dayDebit;
            saldo = days[i]['saldo_out'];
            points.saldo = points.saldo.set(days[i]['day'], days[i]['saldo_out'])
            points.credit = points.credit.set(days[i]['day'], dayCredit)
            points.debit = points.debit.set(days[i]['day'], dayDebit)
            points.count++
        }
        legend = legend.setIn(['debit', 'sum'], debit).setIn(['credit', 'sum'], credit).setIn(['saldo', 'sum'], saldo)
    }

    return {transactions, creditDiagram: creditDiagram.sort().reverse(), debitDiagram: debitDiagram.sort().reverse(), graph: {points, sums, legend}};
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


