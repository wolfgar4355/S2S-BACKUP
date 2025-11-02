'use client'
export default function ExportAsImage({selector='#sheet-root'}:{selector?:string}){
  const run = async () => {
    const el = document.querySelector(selector) as HTMLElement
    if (!el) return alert('Élément non trouvé pour export')
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#f8f3e6' })
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url; a.download = 'sheet2scene.png'; a.click()
  }
  return <button className="rounded border px-3 py-1 text-sm" onClick={run}>Exporter en image</button>
}
