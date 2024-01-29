import {
  Tag,
} from 'antd';

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

interface FilterTagsProps {
  filters: IFilter;
  handleFilter: any;
}

const FilterTags = ({
  filters,
  handleFilter
}: FilterTagsProps) => {

  return (
    <div style={{ margin: '5px 0px 5px'}}>  
      {
        filters.search.length > 0 && (
          <Tag closable onClose={(e) => handleFilter(e, 'search-close')} key={'search'}>
            {filters.search}
          </Tag>
        )  
      }
      { filters.conditions.length > 0 && (filters.conditions.map((condition) => (
        <Tag closeIcon onClose={() => handleFilter(condition, 'conditions-close')} key={condition}>
          {condition}
        </Tag>
      )))}
      {
        filters.makes.length > 0 && (filters.makes.map((make) => (
          <Tag closeIcon onClose={() => handleFilter(make, 'make-close')} key={make}>
            {make}
          </Tag>
        )))
      }
      {
        filters.models.length > 0 && (filters.models.map((model) => (
          <Tag closeIcon onClose={() => handleFilter(model, 'model-close')} key={model}>
            {model}
          </Tag>
        )))
      }
      {
        filters.years.length > 0 && (
          <Tag key={'years'}>
            Year {filters.years[0]} - {filters.years[1]}
          </Tag>
        )
      }
      {
        filters.mileage.length > 0 && (
          <Tag key={'mileage'}>
            Mileage {filters.mileage[0]}km - {filters.mileage[1]}km
          </Tag>
        )
      }
      {
        filters.price.length > 0 && (
          <Tag key={'price'}>
            Price USD {filters.price[0]} - {filters.price[1]}
          </Tag>
        )
      }
    </div>
  )
}

export default FilterTags