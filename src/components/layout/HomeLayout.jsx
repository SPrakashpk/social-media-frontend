import Header from '../Header'
import Sidebar from '../Sidebar'
import Rightbar from '../Rightbar'
import Feed from '../../pages/HomeFeed'

const HomeLayout = () => (
  <>
    <Header />

    <div
      className="layout-container d-flex"
      style={{
        paddingTop: '56px', // matches Header height
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          flexShrink: 0,
          height: '100%',
          overflow: 'hidden',
          borderRight: '1px solid #ddd',
        }}
      >
        <Sidebar />
      </div>

      {/* Feed area - scrollable */}
      <div
        className="feed-area"
        style={{
          flex: 1,
          height: '100%',
          overflowY: 'auto',
          padding: '1rem',
          background: '#f8fafc',
          overflow: 'auto',
        }}
      >
        <Feed/>
      </div>

      {/* Rightbar */}
      <div
        className="feed-area"
        style={{
          width: '300px',
          flexShrink: 0,
          height: '100%',
          overflow: 'auto',
          borderLeft: '1px solid #ddd',

        }}
      >
        <Rightbar />
      </div>
    </div>
  </>

)

export default HomeLayout