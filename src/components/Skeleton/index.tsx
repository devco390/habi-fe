import ContentLoader from 'react-content-loader'

export type SkeletonTypes = 'card' | 'image' | 'detail'

export type SkeletonProps = {
  type: SkeletonTypes
  marginBottom?: string
  elementBackgroundColor?: string
  contentBackgroundColor?: string
}

const Skeleton = ({
  type,
  contentBackgroundColor = '#ffffff',
  elementBackgroundColor = '#dddddd',
  marginBottom = '0xp'
}: SkeletonProps) => {
  const ImageTemplate = () => {
    return (
      <ContentLoader
        width="100%"
        height="100%"
        backgroundColor={elementBackgroundColor}
        style={{
          backgroundColor: contentBackgroundColor,
          marginBottom,
          zIndex: 20
        }}
        role={'skeleton-image'}
        uniqueKey={'skeleton-image'}
      >
        <rect width="100%" height="100%" x="0" y="0" />
      </ContentLoader>
    )
  }

  return <>{type === 'image' && <ImageTemplate />}</>
}

export default Skeleton
