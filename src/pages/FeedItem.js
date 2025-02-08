import './FeedItem.css';
const formatDate = (dateString) => {
  // Create date object from UTC string
  const date = new Date(dateString);
  
  // Get month as short name
  const month = date.toLocaleString('en-US', { month: 'short' });
  
  // Get day number
  const day = date.getDate();
  
  // Get time in 12-hour format
  const time = date.toLocaleString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
  
  // Add ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${month} ${day}${getOrdinalSuffix(day)}, ${time.toLowerCase()}`;
};

const FeedItem = (log) => {
  return (
    <div class="feed-item">
      <div class="text">
        <p class="created-on">{formatDate(log.date_created)}</p>
        <p class="caption">{log.caption}</p>
      </div>
      {log.image_url && (
        <img 
          src={log.image_url}
          alt="Feed Image" 
          className="object-cover" 
        />
      )}
    </div>    
  )
}

export default FeedItem;
