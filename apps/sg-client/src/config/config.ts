export default {
  forms: {
    requestACarLink: ({ email }: { email: string }) => `https://docs.google.com/forms/d/e/1FAIpQLSerMzC4HWA1nDUwWVCxbwvk5Z2yS9BNjJsWgm3EQWTZnGBbeA/viewform?usp=pp_url&entry.1892265409=${email}`,
    listACarLink: ({ email }: { email: string }) => `https://docs.google.com/forms/d/e/1FAIpQLSc2Ehqh5mG3FzBjZMyDqNZjmWUAxee5TAvxCdqqDfhWC2_hrg/viewform?usp=pp_url&entry.362768116=${email}`,
    contactSellingBrokerLink: ({ email, vehicle_id, year, make, model, trim }: { email: string, vehicle_id: number, year: string, make: string, model: string, trim: string }) => `https://docs.google.com/forms/d/e/1FAIpQLSdtNkVtjCxIDH6P7iMGz-Fe2S208mZtpuwEJ42CCHUjc4NGUQ/viewform?usp=pp_url&entry.907431906=${email}&entry.1487388506=${vehicle_id}&entry.521345170=${year}+${make}+${model}+${trim}`,
    joinBrokerNetworkLink : ({}) => `https://forms.gle/V77JrUbuHKnBvJXd9`
  }, 
  featureFlags: {
    showOrderDetails: true, 
    showOrderEvents: false,
    showOrderThirdParty: false,
    showOrderDocuments: true,
    showOrderVehicles: true
  }, 
  filters: {
    years: {
      min: 1999,
      max: 2024
    },
    prices: {
      min: 0,
      max: 1200000
    },
    mileage: {
      min: 0,
      max: 180000
    }
  },
  sorter: [
    { value: 'highest-price', label: 'Highest price' },
    { value: 'lowest-price', label: 'Lowest price' },
    { value: 'lowest-mileage', label: 'Lowest mileage' },
    { value: 'oldest', label: 'Oldest vehicles' },
    { value: 'newest', label: 'Newest vehicles' },
  ]
}