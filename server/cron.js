import { SyncedCron } from 'meteor/percolate:synced-cron'

SyncedCron.config({
    log: true,
    collectionName: 'cronHistory',
    utc: true,
    collectionTTL: 172800
})

// SyncedCron.add({
//     name: 'Find new and updated items',
//     schedule: function(parser) {
//         return parser.text('every 5 minutes')
//     },
//     job: function() {
//         updateItemsFromSpringboard()
//     }
// })
