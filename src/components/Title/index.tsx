import './title.css';

export interface TitleProps {
  children: React.ReactElement,
  name: string
}

export default function Title({ children, name }: TitleProps){
  return(
    <div className="title">
      {children}
      <span>{name}</span>
    </div>
  )
}