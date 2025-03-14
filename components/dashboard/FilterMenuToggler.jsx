import ButtonWithIcon from "../ButtonWithIcon";
import IconButton from "../IconButton";

const FilterMenuToggler = ({ onClick, children }, ref) => {
  return (
    <>
      <ButtonWithIcon
        ref={ref} 
        onClick={ (e) => {e.preventDefault(); onClick(e)} } 
        variant='light' 
        className={`d-none d-md-block sort-search-button`} 
        iconSrc='icons/filter.svg' 
        iconHeight={24} 
        altTag={'Filter icon'}
      >
        {children}
      </ButtonWithIcon>
      <IconButton 
        ref={ref} 
        onClick={ (e) => {e.preventDefault(); onClick(e)} } 
        variant='light' 
        iconSrc={'/icons/filter.svg'} 
        altTag={'Filter icon'} 
        size='sm' 
        className='d-block d-md-none sort-search-button'
      />
    </>
  )
}

export default FilterMenuToggler