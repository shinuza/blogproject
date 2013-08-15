exports.groupBy = function groupBy(list, discriminator) {
  var groups = {}
    , oldDiscriminator;

  if(typeof discriminator == 'string') {
    oldDiscriminator = discriminator;
    discriminator = function(item) {
      return item[oldDiscriminator];
    }
  }

  list.forEach(function(item) {
    var prop = discriminator(item);
    if(!groups[prop]) {
      groups[prop] = [];
    }
    groups[prop].push(item);
  });

  return groups;
};