mongo
use reviews_db
db.vendors.find().forEach(function(d){ db.getSiblingDB('tvendors_backup')['vendors'].insert(d); });
db.reviews.find().forEach(function(d){ db.getSiblingDB('tvendors_backup')['reviews'].insert(d); });

db.vendors.find().forEach(function(d){ db.getSiblingDB('tvendors_prod')['vendors'].insert(d); });
db.reviews.find().forEach(function(d){ db.getSiblingDB('tvendors_prod')['reviews'].insert(d); });

exit