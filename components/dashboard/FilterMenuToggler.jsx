import ButtonWithIcon from "@/components/utils/ButtonWithIcon";
import IconButton from '@/components/utils/IconButton';

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
        altTag={'Filter decks'}
      >
        {children}
      </ButtonWithIcon>
      <IconButton 
        ref={ref} 
        onClick={ (e) => {e.preventDefault(); onClick(e)} } 
        variant='light' 
        iconSrc={'/icons/filter.svg'} 
        altTag={'Filter decks'} 
        size='sm' 
        className='d-block d-md-none sort-search-button'
      />
    </>
  )
}

export default FilterMenuToggler