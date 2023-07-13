
export default function HighestGrowthAssetCard({ ticker, value }) {
    return (
      <div>
        <h2>Highest Growth</h2>
        <h3>{ticker}</h3>
        <h2>{value}</h2>
      </div>
    );
  }