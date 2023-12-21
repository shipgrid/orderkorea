const getVendorNameByProductUrl = url => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url;
  }
  
  const url_object = new URL(url);
  const host_name = url_object.hostname.split('.');
  const vendor = host_name.length > 1 ? host_name[host_name.length - 2].toUpperCase() : host_name[0].toUpperCase();
  
  return vendor;
};

export default getVendorNameByProductUrl;