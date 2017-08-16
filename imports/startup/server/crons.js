import { SyncedCron } from 'meteor/percolate:synced-cron';

SyncedCron.config({
  collectionName: 'crons'
});