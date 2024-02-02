import { 
  useState, 
  useEffect,
  useRef
} from 'react'

import {
  useGetFiltersQuery,
  useGetVehiclesQuery
} from '../services/api'

import debounce from 'lodash/debounce';

interface IFilter {
  search: string[];
  conditions: string[];
  makes: string[]; 
  models: string[]; 
  trims: string[];
  price: number[];
  mileage: number[];
  years: number[];
  sort: string[];
}

const useFilter = () => {

  const [finalUrl, setFinalUrl] = useState('');
  const [isDebounceComplete, setIsDebounceComplete] = useState(false);

  const [filters, setFilters] = useState<IFilter>({ 
    search: [],
    conditions: [],
    makes: [], 
    models: [],
    trims: [],
    price: [0, 1200000],
    mileage: [0, 180000],
    years: [1999, 2024],
    sort: ['highest-price']
  });

  const buildQueryString = (filterObject: any) => {
    const queryParams = [];
    
    for (const key in filterObject) {
      if(filterObject[key].length) {
        queryParams.push(`${key}=${filterObject[key]}`);
      }
    }
    return queryParams.join('&');
  }

  const delayedBuildQueryString = useRef(debounce((filterObject) => {
    const query = buildQueryString(filterObject)
    setIsDebounceComplete(true);
    setFinalUrl(query);
  }, 500, {
    trailing: true
    }
  )).current;
  
  delayedBuildQueryString(filters);
  const { 
    data:searchFilters, 
  } = useGetFiltersQuery({finalUrl: finalUrl}, {
    skip: !isDebounceComplete
  });

  const { 
    data: vehicles = [], 
  } = useGetVehiclesQuery({finalUrl: finalUrl}, {
    skip: !isDebounceComplete
  });

  useEffect(() => {
    setIsDebounceComplete(false); 
  },[filters]);

  const handleFilter = (values: any, name?: string) => {

    if(name === 'sort') {
      setFilters({
        ...filters,
        sort: [values]
      })
    }

    if(name === 'search') {
      setFilters({
        ...filters,
        search: [values]
      })
    }

    if(name === 'conditions') {
      setFilters({
        ...filters,
        conditions: [ ...values ]
      })
    }

    if(name === 'make') {
      setFilters({
        ...filters,
        makes: [ ...values ],
      })
    }

    if(name === 'model') {
      setFilters({
        ...filters,
        models: [ ...values ],
      })
    }

    if(name === 'trim') {
      setFilters({
        ...filters,
        trims: [ ...values ],
      })
    }

    if(name === 'years') {
      setFilters({
        ...filters,
        years: values
      })
    }

    if(name === 'years-min') {
      setFilters({
        ...filters,
        years: [values.target.value, filters.years[1]]
      })
    }
    
    if(name === 'years-max') {
      setFilters({
        ...filters,
        years: [filters.years[0], values.target.value]
      })
    }
    
    if(name === 'mileage') {
      setFilters({
        ...filters,
        mileage: values
      })
    }

    if(name === 'mileage-min') {
      setFilters({
        ...filters,
        mileage: [values.target.value, filters.mileage[1]]
      })
    }

    if(name === 'mileage-max') {
      setFilters({
        ...filters,
        mileage: [filters.mileage[0], values.target.value]
      })
    }
    
    if(name === 'price') {
      setFilters({
        ...filters,
        price: values
      })
    }

    if(name === 'price-min') {
      setFilters({
        ...filters,
        price: [values.target.value, filters.price[1]]
      })
    }

    if(name === 'price-max') {
      setFilters({
        ...filters,
        price: [filters.price[0], values.target.value]
      })
    }

    if(name === 'conditions-close') {
      const conditions = filters.conditions.filter(item => item !== values);
      setFilters({
        ...filters,
        conditions: conditions
      })
    }

    if(name === 'make-close') {
      const makes = filters.makes.filter(item => item !== values);
      setFilters({
        ...filters,
        makes: makes
      })
    }

    if(name === 'model-close') {
      const models = filters.models.filter(item => item !== values);
      setFilters({
        ...filters,
        models: models
      })
    }

    if(name === 'trim-close') {
      const trims = filters.trims.filter(item => item !== values);
      setFilters({
        ...filters,
        trims: trims
      })
    }

    if(name === 'years-close') {
      setFilters({
        ...filters,
        years: []
      })
    }

    if(name === 'mileage-close') {
      setFilters({
        ...filters,
        mileage: []
      })
    }

    if(name === 'price-close') {
      setFilters({
        ...filters,
        price: []
      })
    }

    if(name === 'search-close') {
      setFilters({
        ...filters,
        search: []
      })
    }
  }

  return {
    isDebounceComplete,
    finalUrl,
    filters,
    handleFilter,
    searchFilters,
    vehicles,
  }
}

export default useFilter
