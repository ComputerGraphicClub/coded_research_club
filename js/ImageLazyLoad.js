class ImageLazyLoad {
    /**
     * @type {{small: {loadListener: * | EventListener, isLoaded: boolean, url: string}, xl: {loadListener: * | EventListener, isLoaded: boolean, url: string}, reg: {loadListener: * | EventListener, isLoaded: boolean, url: string}, tiny: {loadListener: * | EventListener, isLoaded: boolean, url: string}}}
     */
    #listOfImageData = {
        xl:     {url: '', isLoaded: false, loadListener: undefined},
        reg:    {url: '', isLoaded: false, loadListener: undefined},
        small:  {url: '', isLoaded: false, loadListener: undefined},
        tiny:   {url: '', isLoaded: false, loadListener: undefined},
    }

    /**@type {HTMLImageElement}*/
    #htmlImageElement

    /**
     * @param {HTMLImageElement} htmlImageElement
     */
    constructor({htmlImageElement}) {
        this.#htmlImageElement = htmlImageElement

        // data-lazyloadurls html attribute must be composed with 3 url of image size:
        // [url image small],[url image reg],[url image xl]
        const lazyLoadUrls = this.#htmlImageElement.dataset.lazyloadurls.split(',')

        if(lazyLoadUrls.length !== 3) console.error('data-lazyloadurls html attribute must be composed with 3 url of image size: \n\t[url image small],[url image reg],[url image xl]')

        this.#listOfImageData.xl.url       = lazyLoadUrls[2]
        this.#listOfImageData.reg.url      = lazyLoadUrls[1]
        this.#listOfImageData.small.url    = lazyLoadUrls[0]
        this.#listOfImageData.tiny.url     = this.#htmlImageElement.src
    }

    /**
     *
     * @param {'xl'|'reg'|'small'|'tiny'} sizeOfImageToLoad
     */
    loadImage({sizeOfImageToLoad}) {

        /**@type {{loadListener: * | EventListener, isLoaded: boolean, url: string}}*/
        const currentImageData = this.#listOfImageData[sizeOfImageToLoad]

        if(currentImageData.loadListener !== undefined || currentImageData.isLoaded) return

        currentImageData.loadListener = () => {
            currentImageData.isLoaded = true

            window.setInterval(() => {
                this.#htmlImageElement.src = currentImageData.url
                this.#htmlImageElement.classList.add('is-loaded')
            }, 1000)

            console.info(this, 'is loaded')
        }

        const imageForLoadingEvent = new Image()
        imageForLoadingEvent.src = currentImageData.url
        imageForLoadingEvent.addEventListener('load', currentImageData.loadListener)
    }
}