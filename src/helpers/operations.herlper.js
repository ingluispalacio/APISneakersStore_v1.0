const currentDateTime = (objJson=true)=> {
    const date = new Date();
    let severDateTime= `${year}/${month}/${day} ${hours}:${minutes}:${second}`;
    const year = fecha.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();
    if (objJson) {
         severDateTime = {
            hora: hours,
            minutes: minutes,
            second: second,
            day: day,
            month: month, 
            year: year,
          };
          return severDateTime;
    }
    return severDateTime;

}

const calculateExpirationDate = (duration) => {
    const date = new Date();
    const durationRegex = /^(\d+)([dMyhm])$/; 
  
    const match = duration.match(durationRegex);
  
    if (!match) {
      throw new Error('Invalid duration format. Use examples like "1m", "1h", "1d", "1M" or "1y"');
    }
  
    const amount = parseInt(match[1]);
    const unit = match[2];
  
    let durationInMillisecond;
  
    switch (unit) {
      case 'm':
        durationInMillisecond = amount * 60 * 1000; 
        break;
      case 'h':
        durationInMillisecond = amount * 60 * 60 * 1000; 
        break;
      case 'd':
        durationInMillisecond = amount * 24 * 60 * 60 * 1000; 
        break;
      case 'M':
        durationInMillisecond = amount * 30 * 24 * 60 * 60 * 1000; 
        break;
      case 'y':
        durationInMillisecond = amount * 365 * 24 * 60 * 60 * 1000; 
        break;
      default:
        throw new Error('unit of unrecognized duration. Use "d", "m" or "y"');
    }
  
    const expirationDate = new Date(date.getTime() + durationInMillisecond);
  
    return expirationDate;
}

module.exports={
    currentDateTime, calculateExpirationDate
};