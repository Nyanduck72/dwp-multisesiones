export default function Page() {
  return (
    <div style={{margin: '0 20% 0 20%'}}>
      <div style={{height: '20vh', width: '100%', objectFit: 'cover', padding: '5px', margin: '10px 0 10px 0', cursor: 'pointer'}}>
          <img src="./main-banner.jpg" style={{height: '100%', width: '100%'}} />
      </div>
      <div style={{height: '60vh', width: '100%', objectFit: 'cover', padding: '5px', margin: '10px 0 10px 0'}}>
          <img src="./main-item1.webp" style={{height: '100%', width: '100%'}} />
      </div>
    </div>
  );
}