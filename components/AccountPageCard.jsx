

const AccountPageCard = ({ paddingY, ...props }) => {
  let classes = `py-${paddingY || '40'} px-25 px-sm-40 bg-white rounded border border-1point5 border-gray-150`
  if (props.className) classes += " " + props.className;

  return (
    <div className={classes} >
      {props.children}
    </div>
  )
}

export default AccountPageCard