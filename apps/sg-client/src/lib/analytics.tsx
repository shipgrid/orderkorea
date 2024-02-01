import ReactGA from 'react-ga4';


const initGA = () => {
  try {
    const GA_TRACKING_ID = import.meta.env.VITE_APP_GA_TRACKING_ID;
  
    if (!GA_TRACKING_ID) {
      console.error('GA_TRACKING_ID is not set')
      return
    }

    ReactGA.initialize(GA_TRACKING_ID);
  } catch (e) {
    console.error('Issue with initializing GA: ', e)
  }

};

const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

const trackFormOpen = (formName: string) => {
  ReactGA.event({
    category: 'Google Form',
    action: 'Opened Google Form',
    label: formName
  })
}

export {
  initGA,
  trackPageView,
  trackFormOpen
}
