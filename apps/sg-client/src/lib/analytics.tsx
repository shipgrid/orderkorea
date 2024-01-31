import ReactGA from 'react-ga4';

const GA_TRACKING_ID = 'G-XVLZR9C776'; 

const initGA = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

const trackFormOpen = (formName: string) => {
  ReactGA.event({
    category: 'form',
    action: 'open',
    label: formName
  })
}

export {
  initGA,
  trackPageView,
  trackFormOpen
}
