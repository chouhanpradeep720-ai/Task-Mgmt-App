function SummaryCard({title,value,color}){


return(

<div className="summary-card">


<h5>
{title}
</h5>


<h2 className={color}>
{value}
</h2>


</div>


);


}


export default SummaryCard;
