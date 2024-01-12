import { getDocumentTypeByBundle } from '../../utils/getDocumentTypeByBundle'

const appRoot	= '/'
const viewerUrl = import.meta.env.PUBLIC_VIEWERURL

const BookItem = (props) => {
	const { document } = props
  const bundle = getDocumentTypeByBundle(document.bundle)
  const type = bundle.substring(0, bundle.length - 1) // remove the trailing 's' from the bundle name
  return (
    <article class="item">
      <div class="card">
        <div class="thumbs">
          <div class="clipper">
            <a href={`${type}/${document.sm_field_identifier}`} aria-hidden="true" role="presentation" tabindex="-1">
              <img src={`${viewerUrl}/api/image/${bundle}/${document.sm_field_identifier}/1/full/150,/0/default.jpg`} alt="" title={document.ss_title_long} role="presentation" />
            </a>
          </div>
        </div>
        <h1 class="md_title">
          <a href={`${type}/${document.sm_field_identifier}`}>{document.ss_title_long}</a>
        </h1>
        <div class="md_authors">
          <span class="md_label">Author:</span>
          {
            document.sm_author.map((author) => ( <span class="md_author">{author}</span> ))
          }
        </div>
        <div class="md_publisher">
          <span class="md_label">Publisher:</span>
          {
            document.sm_field_publication_location.map((location) => ( <span>{location}</span> ))
          }
          ,
          {
            document.sm_publisher.map((publisher) => ( <span>{publisher}</span> ))
          }
          , { document.ss_pubdate }
        </div>
      </div>
      <div class="md_provider">
        <span class="md_label">Provider:</span>
        {
          document.sm_collection_partner_label.map((collectionPartner) => ( <span>{collectionPartner}</span> ))
        }
      </div>
      <div class="md_subjects">
        <span class="md_label">Subjects:</span>
        {
          document.sm_subject_label.map((subject) => (
            <a class="md_subject" href={`${appRoot}}/search?q=${subject}`}>{subject}</a>
          ))
        }
      </div>
    </article>
  )
}

export default BookItem
