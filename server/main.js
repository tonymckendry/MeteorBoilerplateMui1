import { Meteor } from 'meteor/meteor'
import { SyncedCron } from 'meteor/percolate:synced-cron'

import '../imports/startup/server/index'

Meteor.startup(() => {
    // code to run on server at startup
    process.env.MAIL_URL = 'smtp://SMTP_Injection:<sparkpostAPIKey>@smtp.sparkpostmail.com:2525' //replace <APIKey>
    Accounts.emailTemplates.from = '' //address you'd like emails sent from
    // SyncedCron.start() //uncomment to start cron
})
