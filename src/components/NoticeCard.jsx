import { formatDate } from '../lib/utils'

export default function NoticeCard({ notice }) {
  return (
    <article className="bg-white border border-slate/10 rounded-lg p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-serif font-semibold text-lg text-green-dark">{notice.title}</h3>
        <span className="shrink-0 text-xs text-slate/50 whitespace-nowrap mt-1">
          {formatDate(notice.createdAt)}
        </span>
      </div>
      <p className="text-sm text-slate/80 leading-relaxed whitespace-pre-line">{notice.body}</p>
      {notice.category && (
        <span className="inline-block mt-3 text-xs font-medium text-brass bg-brass/10 px-2 py-1 rounded">
          {notice.category}
        </span>
      )}
    </article>
  )
}
