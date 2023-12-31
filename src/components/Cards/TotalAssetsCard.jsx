  import "../css/Cards.css"
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faGlobe } from '@fortawesome/free-solid-svg-icons'
  
  export default function HighestGrowthAssetCard({ numAssets }) {
    return (
      <div className="asset-card">
        <div className="roww">
          <div className="col-icon">
            <FontAwesomeIcon icon={faGlobe} className="asset-icon total"/>
          </div>
          <div className="col-info">
    
            <h2 className="asset-value">{parseFloat(numAssets)}</h2>
          </div>
        </div>
        <hr className="divider"/>
        <div className="roww">
          <h2 className="card-title">Total Assets</h2>
        </div>
      </div>
    );
  }
  