import "../css/Cards.css"

export default function HighestValueAssetCard({ ticker, value }) {
    return (
      <div className="asset-card value">
        <h2 className="asset-card">Highest Value </h2>
        <h3 className="asset-card ticker">{ticker}</h3>
        <h2 className="asset-card value">{value}</h2>
      </div>
    );
  }
  

  