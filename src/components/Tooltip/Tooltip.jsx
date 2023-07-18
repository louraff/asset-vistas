import"../css/Donut.css"

export default function Tooltip({content, position}) {
    return (
        <div 
            className="tooltip"
            style={{ 
                left: position.x + 'px', 
                top: position.y + 'px', 
                opacity: content ? 1 : 0, 
                pointerEvents: content ? 'auto' : 'none'
            }}
        >
            {content}
        </div>
    );
}
