export default {
  requestACarLink: ({ email }: { email: string }) => `https://docs.google.com/forms/d/e/1FAIpQLSc2Ehqh5mG3FzBjZMyDqNZjmWUAxee5TAvxCdqqDfhWC2_hrg/viewform?usp=pp_url&entry.362768116=${email}`,
  listACarLink: ({ email }: { email: string }) => `https://docs.google.com/forms/d/e/1FAIpQLSc2Ehqh5mG3FzBjZMyDqNZjmWUAxee5TAvxCdqqDfhWC2_hrg/viewform?usp=pp_url&entry.362768116=${email}`
}