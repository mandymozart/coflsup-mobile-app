import { ContentId } from './content-id'
import { Icon } from './icon'
import { Title, Description } from './title'

export type Title = string
export type Description = string

export class SpaceLink {

    private _title: Title 
    get title() { return this._title }
    set title(value: string){ this._title = value }

    private _contentId: ContentId 
    get contentId() { return this._contentId }
    set contentId(value: ContentId){ this._contentId = value }

    private _icon: Icon 
    get icon() { return this._icon }
    set icon(value: Icon){ this._icon = value }

    private _description: Description 
    get description() { return this._description }
    set description(value: string){ this._description = value }

    private _url: URL 
    get url() { return this._url }
    set url(value: URL){ this._url = value }

    constructor(title?: Title, contentId?: ContentId, icon?: Icon, description?: Description, url?: URL){

    }
}