import { default as NextImage, ImageProps } from 'next/image'
import {
  FC,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import Skeleton from 'components/Skeleton'

import * as S from './styles'

const Image: FC<ImageProps & { showError?: boolean }> = ({
  ...props
}): ReactElement => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const refWrapperImage = useRef<HTMLDivElement>(null)

  const { src } = props
  const { showError, ...imageProps } = props

  useEffect(() => {
    if (
      (
        refWrapperImage.current?.firstChild?.firstChild as
          | HTMLImageElement
          | undefined
      )?.complete
    ) {
      setLoaded(true)
    }
  }, [])

  const handleLoad = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
    if ((e.target as HTMLImageElement).srcset) {
      setLoaded(true)
    }
  }

  const handleError = (): void => {
    setError(true)
  }

  const handleReloadImage = (
    e: SyntheticEvent<HTMLButtonElement, Event>
  ): void => {
    e.stopPropagation()
    setError(false)
    setLoaded(false)
  }

  return (
    <S.Wrapper ref={refWrapperImage}>
      {!loaded && !error && <Skeleton type="image" />}
      {error && (
        <S.WrapperError>
          {showError && (
            <>
              <h5>Error</h5>

              <S.ReloadImage type={'button'} onClick={handleReloadImage}>
                Cargar nuevamente
              </S.ReloadImage>
              <S.OpenNewTab
                href={src}
                target="_blank"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                Abrir en una nueva pestaña
              </S.OpenNewTab>
            </>
          )}
        </S.WrapperError>
      )}

      {!error && (
        <NextImage
          data-testid="next-image"
          {...imageProps}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </S.Wrapper>
  )
}

export default Image
