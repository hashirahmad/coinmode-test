const xinq = require('xinq').init() // helper library for this test (you don't have to use this)
const transactions = require('./testdata.json') // import the test data

/**
 *  You can run this application by running `npm run dev` in
 *  your console/terminal
 */
class App {
    
    /**
     *  this function must return only 'completed'
     *  transactions
     */
    returnOnlyComplete () {
        // TODO:
        let completed = []
        /*
            I understand there are new ES6 functions
            such as 
                some
                filter
                map
            but these functions are slower than native
            vanialla javascript for-loop as it has 
            the highest performance.
            It is true, performance is negligible on
            smaller sets however performance certainely 
            hits on larger data sets    
        */
        for ( let t in transactions ) {

            if ( transactions[ t ].status === 'completed' ) completed.push( transactions[ t ] )

        }
        return completed
    }

    /**
     *  this function must return 'completed' and
     *  'refunded' transactions
     */
    returnCompleteAndRefunded () {
        // TODO:
        let completedRefunded = []
        for ( let t in transactions ) {

            if ( transactions[ t ].status === 'completed' ||
                 transactions[t].status === 'refunded' 
            ) 
                completedRefunded.push( transactions[ t ] )

        }
        return completedRefunded
    }

    /**
     *  this function must get all 'in-progress' items
     *  then set their states to 'completed'
     *  and finally return the result
     */
    returnInprogressAsCompleted () {
        //TODO:
        let inProgress = []
        for ( let t in transactions ) {

            if ( transactions[ t ].status === 'in-progress' ) {
                transactions[ t ].status = 'completed'
                inProgress.push( transactions[ t ] ) 
            }

        }
        return inProgress
        //return inProgressToCompleted;
    }

    /**
     * Using setTimeout, after 1 second delay get this function to return, via a callback method (cb) the number of elements in the transactions array.
     * The callback is in the standard callback format of
     * 
     *  callback( error, numberOfItems );
     *  
     */
    returnDelayViaCallback ( cb ) {
        // TODO:
        setTimeout( () => {

            cb( null, transactions.length )

        }, 1 * 1000 )
    }

    /**
     * Return a Promise that will resolve 1 second later with the number of elements in the transactions array
     */
    async returnDelayViaAsync () {
        return new Promise( ( res, rej ) => {

            setTimeout( () => {

                res( transactions.length )

            }, 1 * 1000 )

        } ); // TODO:
    }
}

module.exports = new App()
