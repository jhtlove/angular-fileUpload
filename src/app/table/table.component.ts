import { HiswsService } from './../hisws/hisws.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { LoginService } from '../service/login.service';
import { debounceTime } from 'rxjs/operators';
import { FileBean } from '../bean/FileBean';
// import * as $ from 'jquery';
// import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  head = '内外网文件转换';
  subhead = '个人文件';
  display = false;
  files: FileBean[];
  fileFilterControl: FormControl = new FormControl();
  keyWord: string;
  sortField: string;
  isAsc: boolean;
  sortClass = 'fa fa-unsorted';
  uploadedFiles: any[] = [];

  constructor(public tableService: HiswsService, public loginService: LoginService) {
  }

  // DoCheck
  // ngDoCheck() {
  //   // Called every time that the input properties of a component or a directive are checked.
  //   // Use it to extend change detection by performing a custom check.
  //   // Add 'implements DoCheck' to the class.
  //   console.log('doCheck!');
  // }

  // ngOnInit ngAfterContentInit 执行 在 ngFor 组织模板之前？？？
  ngOnInit() {
    this.getDatas(); // 查询文件列表

    this.fileFilterControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => this.keyWord = value);
  }

  ngOnDestroy() {
    this.loginService.logOut();
  }

  getDatas(): void {
    this.tableService.grwjfilews(sessionStorage.getItem('currentUser')).subscribe(data => {

      // tslint:disable-next-line:prefer-const
      let isSuccesed = data;
      if (!isSuccesed) {
        alert('查询个人文件信息失败');
      } else {
        this.files = data; // 赋值后 页面拿数据组织界面 *ngFor 然后再触发 dataTable
      }
    }
    );
  }

  find() {
    this.getDatas();
  }

  toggle(field: string) {
    this.sortField = field;
    if (this.sortClass === 'fa fa-unsorted') {
      // 点一下升序
      this.sortClass = 'fa fa-sort-asc';
      this.isAsc = true;
    } else if (this.sortClass === 'fa fa-sort-asc') {
      this.sortClass = 'fa fa-sort-desc';
      this.isAsc = false;
    } else {
      this.sortClass = 'fa fa-sort-asc';
      this.isAsc = true;
    }
  }

  download(spath: string, swjm: string) {
    this.tableService.getwjnrws(spath).subscribe(data => {
      const content = data.swjnr;
      if (content) {
        // alert('下载');
        console.log('下载' + content);
        const index = swjm.lastIndexOf('.');
        const fileType = swjm.substring(index);
        const mime = {
          '.323': 'text/h323',
          '.3gp': 'video/3gpp',
          '.aab': 'application/x-authoware-bin',
          '.aam': 'application/x-authoware-map',
          '.aas': 'application/x-authoware-seg',
          '.acx': 'application/internet-property-stream',
          '.ai': 'application/postscript',
          '.aif': 'audio/x-aiff',
          '.aifc': 'audio/x-aiff',
          '.aiff': 'audio/x-aiff',
          '.als': 'audio/X-Alpha5',
          '.amc': 'application/x-mpeg',
          '.ani': 'application/octet-stream',
          '.apk': 'application/vnd.android.package-archive',
          '.asc': 'text/plain',
          '.asd': 'application/astound',
          '.asf': 'video/x-ms-asf',
          '.asn': 'application/astound',
          '.asp': 'application/x-asap',
          '.asr': 'video/x-ms-asf',
          '.asx': 'video/x-ms-asf',
          '.au': 'audio/basic',
          '.avb': 'application/octet-stream',
          '.avi': 'video/x-msvideo',
          '.awb': 'audio/amr-wb',
          '.axs': 'application/olescript',
          '.bas': 'text/plain',
          '.bcpio': 'application/x-bcpio',
          '.bin ': 'application/octet-stream',
          '.bld': 'application/bld',
          '.bld2': 'application/bld2',
          '.bmp': 'image/bmp',
          '.bpk': 'application/octet-stream',
          '.bz2': 'application/x-bzip2',
          '.c': 'text/plain',
          '.cal': 'image/x-cals',
          '.cat': 'application/vnd.ms-pkiseccat',
          '.ccn': 'application/x-cnc',
          '.cco': 'application/x-cocoa',
          '.cdf': 'application/x-cdf',
          '.cer': 'application/x-x509-ca-cert',
          '.cgi': 'magnus-internal/cgi',
          '.chat': 'application/x-chat',
          '.class': 'application/octet-stream',
          '.clp': 'application/x-msclip',
          '.cmx': 'image/x-cmx',
          '.co': 'application/x-cult3d-object',
          '.cod': 'image/cis-cod',
          '.conf': 'text/plain',
          '.cpio': 'application/x-cpio',
          '.cpp': 'text/plain',
          '.cpt': 'application/mac-compactpro',
          '.crd': 'application/x-mscardfile',
          '.crl': 'application/pkix-crl',
          '.crt': 'application/x-x509-ca-cert',
          '.csh': 'application/x-csh',
          '.csm': 'chemical/x-csml',
          '.csml': 'chemical/x-csml',
          '.css': 'text/css',
          '.cur': 'application/octet-stream',
          '.dcm': 'x-lml/x-evm',
          '.dcr': 'application/x-director',
          '.dcx': 'image/x-dcx',
          '.der': 'application/x-x509-ca-cert',
          '.dhtml': 'text/html',
          '.dir': 'application/x-director',
          '.dll': 'application/x-msdownload',
          '.dmg': 'application/octet-stream',
          '.dms': 'application/octet-stream',
          '.doc': 'application/msword',
          '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          '.dot': 'application/msword',
          '.dvi': 'application/x-dvi',
          '.dwf': 'drawing/x-dwf',
          '.dwg': 'application/x-autocad',
          '.dxf': 'application/x-autocad',
          '.dxr': 'application/x-director',
          '.ebk': 'application/x-expandedbook',
          '.emb': 'chemical/x-embl-dl-nucleotide',
          '.embl': 'chemical/x-embl-dl-nucleotide',
          '.eps': 'application/postscript',
          '.epub': 'application/epub+zip',
          '.eri': 'image/x-eri',
          '.es': 'audio/echospeech',
          '.esl': 'audio/echospeech',
          '.etc': 'application/x-earthtime',
          '.etx': 'text/x-setext',
          '.evm': 'x-lml/x-evm',
          '.evy': 'application/envoy',
          '.exe': 'application/octet-stream',
          '.fh4': 'image/x-freehand',
          '.fh5': 'image/x-freehand',
          '.fhc': 'image/x-freehand',
          '.fif': 'application/fractals',
          '.flr': 'x-world/x-vrml',
          '.flv': 'flv-application/octet-stream',
          '.fm': 'application/x-maker',
          '.fpx': 'image/x-fpx',
          '.fvi': 'video/isivideo',
          '.gau': 'chemical/x-gaussian-input',
          '.gca': 'application/x-gca-compressed',
          '.gdb': 'x-lml/x-gdb',
          '.gif': 'image/gif',
          '.gps': 'application/x-gps',
          '.gtar': 'application/x-gtar',
          '.gz': 'application/x-gzip',
          '.h': 'text/plain',
          '.hdf': 'application/x-hdf',
          '.hdm': 'text/x-hdml',
          '.hdml': 'text/x-hdml',
          '.hlp': 'application/winhlp',
          '.hqx': 'application/mac-binhex40',
          '.hta': 'application/hta',
          '.htc': 'text/x-component',
          '.htm': 'text/html',
          '.html': 'text/html',
          '.hts': 'text/html',
          '.htt': 'text/webviewhtml',
          '.ice': 'x-conference/x-cooltalk',
          '.ico': 'image/x-icon',
          '.ief': 'image/ief',
          '.ifm': 'image/gif',
          '.ifs': 'image/ifs',
          '.iii': 'application/x-iphone',
          '.imy': 'audio/melody',
          '.ins': 'application/x-internet-signup',
          '.ips': 'application/x-ipscript',
          '.ipx': 'application/x-ipix',
          '.isp': 'application/x-internet-signup',
          '.it': 'audio/x-mod',
          '.itz': 'audio/x-mod',
          '.ivr': 'i-world/i-vrml',
          '.j2k': 'image/j2k',
          '.jad': 'text/vnd.sun.j2me.app-descriptor',
          '.jam': 'application/x-jam',
          '.jar': 'application/java-archive',
          '.java': 'text/plain',
          '.jfif': 'image/pipeg',
          '.jnlp': 'application/x-java-jnlp-file',
          '.jpe': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.jpg': 'image/jpeg',
          '.jpz': 'image/jpeg',
          '.js': 'application/x-javascript',
          '.jwc': 'application/jwc',
          '.kjx': 'application/x-kjx',
          '.lak': 'x-lml/x-lak',
          '.latex': 'application/x-latex',
          '.lcc': 'application/fastman',
          '.lcl': 'application/x-digitalloca',
          '.lcr': 'application/x-digitalloca',
          '.lgh': 'application/lgh',
          '.lha': 'application/octet-stream',
          '.lml': 'x-lml/x-lml',
          '.lmlpack': 'x-lml/x-lmlpack',
          '.log': 'text/plain',
          '.lsf': 'video/x-la-asf',
          '.lsx': 'video/x-la-asf',
          '.lzh': 'application/octet-stream',
          '.m13': 'application/x-msmediaview',
          '.m14': 'application/x-msmediaview',
          '.m15': 'audio/x-mod',
          '.m3u': 'audio/x-mpegurl',
          '.m3url': 'audio/x-mpegurl',
          '.m4a': 'audio/mp4a-latm',
          '.m4b': 'audio/mp4a-latm',
          '.m4p': 'audio/mp4a-latm',
          '.m4u': 'video/vnd.mpegurl',
          '.m4v': 'video/x-m4v',
          '.ma1': 'audio/ma1',
          '.ma2': 'audio/ma2',
          '.ma3': 'audio/ma3',
          '.ma5': 'audio/ma5',
          '.man': 'application/x-troff-man',
          '.map': 'magnus-internal/imagemap',
          '.mbd': 'application/mbedlet',
          '.mct': 'application/x-mascot',
          '.mdb': 'application/x-msaccess',
          '.mdz': 'audio/x-mod',
          '.me': 'application/x-troff-me',
          '.mel': 'text/x-vmel',
          '.mht': 'message/rfc822',
          '.mhtml': 'message/rfc822',
          '.mi': 'application/x-mif',
          '.mid': 'audio/mid',
          '.midi': 'audio/midi',
          '.mif': 'application/x-mif',
          '.mil': 'image/x-cals',
          '.mio': 'audio/x-mio',
          '.mmf': 'application/x-skt-lbs',
          '.mng': 'video/x-mng',
          '.mny': 'application/x-msmoney',
          '.moc': 'application/x-mocha',
          '.mocha': 'application/x-mocha',
          '.mod': 'audio/x-mod',
          '.mof': 'application/x-yumekara',
          '.mol': 'chemical/x-mdl-molfile',
          '.mop': 'chemical/x-mopac-input',
          '.mov': 'video/quicktime',
          '.movie': 'video/x-sgi-movie',
          '.mp2': 'video/mpeg',
          '.mp3': 'audio/mpeg',
          '.mp4': 'video/mp4',
          '.mpa': 'video/mpeg',
          '.mpc': 'application/vnd.mpohun.certificate',
          '.mpe': 'video/mpeg',
          '.mpeg': 'video/mpeg',
          '.mpg': 'video/mpeg',
          '.mpg4': 'video/mp4',
          '.mpga': 'audio/mpeg',
          '.mpn': 'application/vnd.mophun.application',
          '.mpp': 'application/vnd.ms-project',
          '.mps': 'application/x-mapserver',
          '.mpv2': 'video/mpeg',
          '.mrl': 'text/x-mrml',
          '.mrm': 'application/x-mrm',
          '.ms': 'application/x-troff-ms',
          '.msg': 'application/vnd.ms-outlook',
          '.mts': 'application/metastream',
          '.mtx': 'application/metastream',
          '.mtz': 'application/metastream',
          '.mvb': 'application/x-msmediaview',
          '.mzv': 'application/metastream',
          '.nar': 'application/zip',
          '.nbmp': 'image/nbmp',
          '.nc': 'application/x-netcdf',
          '.ndb': 'x-lml/x-ndb',
          '.ndwn': 'application/ndwn',
          '.nif': 'application/x-nif',
          '.nmz': 'application/x-scream',
          '.nokia-op-logo': 'image/vnd.nok-oplogo-color',
          '.npx': 'application/x-netfpx',
          '.nsnd': 'audio/nsnd',
          '.nva': 'application/x-neva1',
          '.nws': 'message/rfc822',
          '.oda': 'application/oda',
          '.ogg': 'audio/ogg',
          '.oom': 'application/x-AtlasMate-Plugin',
          '.p10': 'application/pkcs10',
          '.p12': 'application/x-pkcs12',
          '.p7b': 'application/x-pkcs7-certificates',
          '.p7c': 'application/x-pkcs7-mime',
          '.p7m': 'application/x-pkcs7-mime',
          '.p7r': 'application/x-pkcs7-certreqresp',
          '.p7s': 'application/x-pkcs7-signature',
          '.pac': 'audio/x-pac',
          '.pae': 'audio/x-epac',
          '.pan': 'application/x-pan',
          '.pbm': 'image/x-portable-bitmap',
          '.pcx': 'image/x-pcx',
          '.pda': 'image/x-pda',
          '.pdb': 'chemical/x-pdb',
          '.pdf': 'application/pdf',
          '.pfr': 'application/font-tdpfr',
          '.pfx': 'application/x-pkcs12',
          '.pgm': 'image/x-portable-graymap',
          '.pict': 'image/x-pict',
          '.pko': 'application/ynd.ms-pkipko',
          '.pm': 'application/x-perl',
          '.pma': 'application/x-perfmon',
          '.pmc': 'application/x-perfmon',
          '.pmd': 'application/x-pmd',
          '.pml': 'application/x-perfmon',
          '.pmr': 'application/x-perfmon',
          '.pmw': 'application/x-perfmon',
          '.png': 'image/png',
          '.pnm': 'image/x-portable-anymap',
          '.pnz': 'image/png',
          '.pot,': 'application/vnd.ms-powerpoint',
          '.ppm': 'image/x-portable-pixmap',
          '.pps': 'application/vnd.ms-powerpoint',
          '.ppt': 'application/vnd.ms-powerpoint',
          '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          '.pqf': 'application/x-cprplayer',
          '.pqi': 'application/cprplayer',
          '.prc': 'application/x-prc',
          '.prf': 'application/pics-rules',
          '.prop': 'text/plain',
          '.proxy': 'application/x-ns-proxy-autoconfig',
          '.ps': 'application/postscript',
          '.ptlk': 'application/listenup',
          '.pub': 'application/x-mspublisher',
          '.pvx': 'video/x-pv-pvx',
          '.qcp': 'audio/vnd.qcelp',
          '.qt': 'video/quicktime',
          '.qti': 'image/x-quicktime',
          '.qtif': 'image/x-quicktime',
          '.r3t': 'text/vnd.rn-realtext3d',
          '.ra': 'audio/x-pn-realaudio',
          '.ram': 'audio/x-pn-realaudio',
          '.rar': 'application/octet-stream',
          '.ras': 'image/x-cmu-raster',
          '.rc': 'text/plain',
          '.rdf': 'application/rdf+xml',
          '.rf': 'image/vnd.rn-realflash',
          '.rgb': 'image/x-rgb',
          '.rlf': 'application/x-richlink',
          '.rm': 'audio/x-pn-realaudio',
          '.rmf': 'audio/x-rmf',
          '.rmi': 'audio/mid',
          '.rmm': 'audio/x-pn-realaudio',
          '.rmvb': 'audio/x-pn-realaudio',
          '.rnx': 'application/vnd.rn-realplayer',
          '.roff': 'application/x-troff',
          '.rp': 'image/vnd.rn-realpix',
          '.rpm': 'audio/x-pn-realaudio-plugin',
          '.rt': 'text/vnd.rn-realtext',
          '.rte': 'x-lml/x-gps',
          '.rtf': 'application/rtf',
          '.rtg': 'application/metastream',
          '.rtx': 'text/richtext',
          '.rv': 'video/vnd.rn-realvideo',
          '.rwc': 'application/x-rogerwilco',
          '.s3m': 'audio/x-mod',
          '.s3z': 'audio/x-mod',
          '.sca': 'application/x-supercard',
          '.scd': 'application/x-msschedule',
          '.sct': 'text/scriptlet',
          '.sdf': 'application/e-score',
          '.sea': 'application/x-stuffit',
          '.setpay': 'application/set-payment-initiation',
          '.setreg': 'application/set-registration-initiation',
          '.sgm': 'text/x-sgml',
          '.sgml': 'text/x-sgml',
          '.sh': 'application/x-sh',
          '.shar': 'application/x-shar',
          '.shtml': 'magnus-internal/parsed-html',
          '.shw': 'application/presentations',
          '.si6': 'image/si6',
          '.si7': 'image/vnd.stiwap.sis',
          '.si9': 'image/vnd.lgtwap.sis',
          '.sis': 'application/vnd.symbian.install',
          '.sit': 'application/x-stuffit',
          '.skd': 'application/x-Koan',
          '.skm': 'application/x-Koan',
          '.skp': 'application/x-Koan',
          '.skt': 'application/x-Koan',
          '.slc': 'application/x-salsa',
          '.smd': 'audio/x-smd',
          '.smi': 'application/smil',
          '.smil': 'application/smil',
          '.smp': 'application/studiom',
          '.smz': 'audio/x-smd',
          '.snd': 'audio/basic',
          '.spc': 'application/x-pkcs7-certificates',
          '.spl': 'application/futuresplash',
          '.spr': 'application/x-sprite',
          '.sprite': 'application/x-sprite',
          '.sdp': 'application/sdp',
          '.spt': 'application/x-spt',
          '.src': 'application/x-wais-source',
          '.sst': 'application/vnd.ms-pkicertstore',
          '.stk': 'application/hyperstudio',
          '.stl': 'application/vnd.ms-pkistl',
          '.stm': 'text/html',
          '.svg': 'image/svg+xml',
          '.sv4cpio': 'application/x-sv4cpio',
          '.sv4crc': 'application/x-sv4crc',
          '.svf': 'image/vnd',
          '.svh': 'image/svh',
          '.svr': 'x-world/x-svr',
          '.swf': 'application/x-shockwave-flash',
          '.swfl': 'application/x-shockwave-flash',
          '.t': 'application/x-troff',
          '.tad': 'application/octet-stream',
          '.talk': 'text/x-speech',
          '.tar': 'application/x-tar',
          '.taz': 'application/x-tar',
          '.tbp': 'application/x-timbuktu',
          '.tbt': 'application/x-timbuktu',
          '.tcl': 'application/x-tcl',
          '.tex': 'application/x-tex',
          '.texi': 'application/x-texinfo',
          '.texinfo': 'application/x-texinfo',
          '.tgz': 'application/x-compressed',
          '.thm': 'application/vnd.eri.thm',
          '.tif': 'image/tiff',
          '.tiff': 'image/tiff',
          '.tki': 'application/x-tkined',
          '.tkined': 'application/x-tkined',
          '.toc': 'application/toc',
          '.toy': 'image/toy',
          '.tr': 'application/x-troff',
          '.trk': 'x-lml/x-gps',
          '.trm': 'application/x-msterminal',
          '.tsi': 'audio/tsplayer',
          '.tsp': 'application/dsptype',
          '.tsv': 'text/tab-separated-values',
          '.ttf': 'application/octet-stream',
          '.ttz': 'application/t-time',
          '.txt': 'text/plain',
          '.ini': 'text/plain',
          '.uls': 'text/iuls',
          '.ult': 'audio/x-mod',
          '.ustar': 'application/x-ustar',
          '.uu': 'application/x-uuencode',
          '.uue': 'application/x-uuencode',
          '.vcd': 'application/x-cdlink',
          '.vcf': 'text/x-vcard',
          '.vdo': 'video/vdo',
          '.vib': 'audio/vib',
          '.viv': 'video/vivo',
          '.vivo': 'video/vivo',
          '.vmd': 'application/vocaltec-media-desc',
          '.vmf': 'application/vocaltec-media-file',
          '.vmi': 'application/x-dreamcast-vms-info',
          '.vms': 'application/x-dreamcast-vms',
          '.vox': 'audio/voxware',
          '.vqe': 'audio/x-twinvq-plugin',
          '.vqf': 'audio/x-twinvq',
          '.vql': 'audio/x-twinvq',
          '.vre': 'x-world/x-vream',
          '.vrml': 'x-world/x-vrml',
          '.vrt': 'x-world/x-vrt',
          '.vrw': 'x-world/x-vream',
          '.vts': 'workbook/formulaone',
          '.wav': 'audio/x-wav',
          '.wax': 'audio/x-ms-wax',
          '.wbmp': 'image/vnd.wap.wbmp',
          '.wcm': 'application/vnd.ms-works',
          '.wdb': 'application/vnd.ms-works',
          '.web': 'application/vnd.xara',
          '.wi': 'image/wavelet',
          '.wis': 'application/x-InstallShield',
          '.wks': 'application/vnd.ms-works',
          '.wm': 'video/x-ms-wm',
          '.wma': 'audio/x-ms-wma',
          '.wmd': 'application/x-ms-wmd',
          '.wmf': 'application/x-msmetafile',
          '.wml': 'text/vnd.wap.wml',
          '.wmlc': 'application/vnd.wap.wmlc',
          '.wmls': 'text/vnd.wap.wmlscript',
          '.wmlsc': 'application/vnd.wap.wmlscriptc',
          '.wmlscript': 'text/vnd.wap.wmlscript',
          '.wmv': 'audio/x-ms-wmv',
          '.wmx': 'video/x-ms-wmx',
          '.wmz': 'application/x-ms-wmz',
          '.wpng': 'image/x-up-wpng',
          '.wps': 'application/vnd.ms-works',
          '.wpt': 'x-lml/x-gps',
          '.wri': 'application/x-mswrite',
          '.wrl': 'x-world/x-vrml',
          '.wrz': 'x-world/x-vrml',
          '.ws': 'text/vnd.wap.wmlscript',
          '.wsc': 'application/vnd.wap.wmlscriptc',
          '.wv': 'video/wavelet',
          '.wvx': 'video/x-ms-wvx',
          '.wxl': 'application/x-wxl',
          '.x-gzip': 'application/x-gzip',
          '.xaf': 'x-world/x-vrml',
          '.xar': 'application/vnd.xara',
          '.xbm': 'image/x-xbitmap',
          '.xdm': 'application/x-xdma',
          '.xdma': 'application/x-xdma',
          '.xdw': 'application/vnd.fujixerox.docuworks',
          '.xht': 'application/xhtml+xml',
          '.xhtm': 'application/xhtml+xml',
          '.xhtml': 'application/xhtml+xml',
          '.xla': 'application/vnd.ms-excel',
          '.xlc': 'application/vnd.ms-excel',
          '.xll': 'application/x-excel',
          '.xlm': 'application/vnd.ms-excel',
          '.xls': 'application/vnd.ms-excel',
          '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          '.xlt': 'application/vnd.ms-excel',
          '.xlw': 'application/vnd.ms-excel',
          '.xm': 'audio/x-mod',
          '.xml': 'application/xml',
          '.xmz': 'audio/x-mod',
          '.xof': 'x-world/x-vrml',
          '.xpi': 'application/x-xpinstall',
          '.xpm': 'image/x-xpixmap',
          '.xsit': 'text/xml',
          '.xsl': 'text/xml',
          '.xul': 'text/xul',
          '.xwd': 'image/x-xwindowdump',
          '.xyz': 'chemical/x-pdb',
          '.yz1': 'application/x-yz1',
          '.z': 'application/x-compress',
          '.zac': 'application/x-zaurus-zac',
          '.zip': 'application/zip',
          '.json': 'application/json'
        };
        // alert(fileType);
        if (fileType in mime) {
          // alert('下载文件');
          const reader = new FileReader();

          const saveAs = (function (view: any) {
            'use strict';
            // IE <10 is explicitly unsupported
            if (typeof view === 'undefined' || typeof navigator !== 'undefined' && /MSIE [1-9]\./.test(navigator.userAgent)) {
              alert('浏览器不支持!');
              return;
            }
            // alert('开始下载');
            const doc = view.document
              // only get URL when necessary in case Blob.js hasn't overridden it yet
              , get_URL = function () {
                return view.URL || view.webkitURL || view;
              }
              , save_link = doc.createElementNS('http://www.w3.org/1999/xhtml', 'a')
              , can_use_save_link = 'download' in save_link
              , click = function (node) {
                const event = new MouseEvent('click');
                node.dispatchEvent(event);
              }
              , is_safari = /constructor/i.test(view.HTMLElement) || view.safari
              , is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent)
              , throw_outside = function (ex) {
                (view.setImmediate || view.setTimeout)(function () {
                  throw ex;
                }, 0);
              }
              , force_saveable_type = 'application/octet-stream'
              // the Blob API is fundamentally broken as there is no 'downloadfinished' event to subscribe to
              , arbitrary_revoke_timeout = 1000 * 40 // in ms
              , revoke = function (file) {
                const revoker = function () {
                  if (typeof file === 'string') { // file is an object URL
                    get_URL().revokeObjectURL(file);
                  } else { // file is a File
                    file.remove();
                  }
                };
                setTimeout(revoker, arbitrary_revoke_timeout);
              }
              , dispatch = function (filesaver, event_types, event?) {
                event_types = [].concat(event_types);
                let i = event_types.length;
                while (i--) {
                  const listener = filesaver['on' + event_types[i]];
                  if (typeof listener === 'function') {
                    try {
                      listener.call(filesaver, event || filesaver);
                    } catch (ex) {
                      throw_outside(ex);
                    }
                  }
                }
              }
              , auto_bom = function (b) {
                // prepend BOM for UTF-8 XML and text/* types (including HTML)
                // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
                if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(b.type)) {
                  return new Blob([String.fromCharCode(0xFEFF), b], { type: b.type });
                }
                return b;
              }
              ,
              FileSaver = function (b, name, no_auto_bom) {
                if (!no_auto_bom) {
                  b = auto_bom(b);
                }
                // First try a.download, then web filesystem, then object URLs
                const filesaver = this
                  , type = b.type
                  , force = type === force_saveable_type;
                let object_url;
                const dispatch_all = function () {
                  dispatch(filesaver, 'writestart progress write writeend'.split(' '));
                }
                  // on any filesys errors revert to saving with object URLs
                  , fs_error = function () {
                    if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
                      // Safari doesn't allow downloading of blob urls
                      // const reader = new FileReader();
                      reader.onloadend = function () {
                        let url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
                        const popup = view.open(url, '_blank');
                        if (!popup) { view.location.href = url; }
                        url = undefined; // release reference before dispatching
                        filesaver.readyState = filesaver.DONE;
                        dispatch_all();
                      };
                      reader.readAsDataURL(b);
                      filesaver.readyState = filesaver.INIT;
                      return;
                    }
                    // don't create more object URLs than needed
                    if (!object_url) {
                      object_url = get_URL().createObjectURL(b);
                    }
                    if (force) {
                      view.location.href = object_url;
                    } else {
                      const opened = view.open(object_url, '_blank');
                      if (!opened) {
                        // Apple does not allow window.open,
                        // see https://developer.apple.com/library/safari/documentation/
                        // Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
                        view.location.href = object_url;
                      }
                    }
                    filesaver.readyState = filesaver.DONE;
                    dispatch_all();
                    revoke(object_url);
                  }
                  ;
                filesaver.readyState = filesaver.INIT;

                if (can_use_save_link) {
                  object_url = get_URL().createObjectURL(b);
                  setTimeout(function () {
                    save_link.href = object_url;
                    save_link.download = name;
                    click(save_link);
                    dispatch_all();
                    revoke(object_url);
                    filesaver.readyState = filesaver.DONE;
                  });
                  return;
                }

                fs_error();
              }


              , FS_proto = FileSaver.prototype
              ,
              saveAs = function (b, name?, no_auto_bom?) {
                return new FileSaver(b, name || b.name || 'download', no_auto_bom);
              }
              ;
            // IE 10+ (native saveAs)
            if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
              return function (b, name, no_auto_bom) {
                name = name || b.name || 'download';

                if (!no_auto_bom) {
                  b = auto_bom(b);
                }
                return navigator.msSaveOrOpenBlob(b, name);
              };
            }

            FS_proto.abort = function () { };
            FS_proto.readyState = FS_proto.INIT = 0;
            FS_proto.WRITING = 1;
            FS_proto.DONE = 2;

            FS_proto.error =
              FS_proto.onwritestart =
              FS_proto.onprogress =
              FS_proto.onwrite =
              FS_proto.onabort =
              FS_proto.onerror =
              FS_proto.onwriteend =
              null;

            return saveAs;
          }(
            typeof self !== 'undefined' && self
            || typeof window !== 'undefined' && window
          ));

          const myFile = this.createFile(content, mime[fileType]);
          // const file = new File([myFile], swjm, { type: mime[fileType] });
          // Saver.saveAs(myFile, swjm);
          if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 1024) {
            reader.onload = function (event) {
              // alert('phone');
              console.log('onload', event);
              const save = document.createElement('a');

              if (navigator.platform && navigator.platform.match(/iPhone|iPod|iPad/)) {
                // If iPhone etc
                // alert('iPhone');
                const url = window.URL.createObjectURL(myFile);
                window.location.href = url;
              } else {
                // Any other browser
                saveAs(myFile, swjm);
              }
              window.URL.revokeObjectURL(save.href);
            };

            reader.readAsDataURL(myFile);
          } else {
            saveAs(myFile, swjm);
          }
        } else {
          alert('未识别的文件类型！');
          const myFile = this.createFile(content, 'application/octet-stream');
         // saveAs(myFile, swjm);
        }

      }
    });

  }

  createFile(data, type) {
    const bytes = window.atob(data);
    let n = bytes.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bytes.charCodeAt(n); // 返回在指定的位置的字符的 Unicode 编码
    }
    return new Blob([u8arr], { type: type });
  }



  // js 读取文件
  upload(files: FileList, service: HiswsService) {
    function getDateStr(d: Date) {
      const year = d.getFullYear();
      const mouth = d.getMonth() + 1;
      const hour = d.getHours();
      const minute = d.getMinutes();
      const second = d.getSeconds();
      let mouthStr: string;
      let dayStr: string;
      let hourStr: string;
      let minuteStr: string;
      let secondStr: string;
      if (mouth < 10) {
        mouthStr = '0' + mouth;
      } else {
        mouthStr = '' + mouth;
      }
      const day = d.getDate();
      if (day < 10) {
        dayStr = '0' + day;
      } else {
        dayStr = '' + day;
      }
      if (hour < 10) {
        hourStr = '0' + hour;
      } else {
        hourStr = '' + hour;
      }
      if (minute < 10) {
        minuteStr = '0' + minute;
      } else {
        minuteStr = '' + minute;
      }
      if (second < 10) {
        secondStr = '0' + second;
      } else {
        secondStr = '' + second;
      }
      return `${year}/${mouthStr}/${dayStr} ${hourStr}:${minuteStr}:${secondStr}`;
    }
    console.log('time: ' + getDateStr(new Date()));
    if (files.length) {
      const file = files[0];
      // const fileType = file.type;
      const reader = new FileReader(); // new一个FileReader实例
      reader.onload = function (e) {

        const t: any = e.target;
        console.log('上传：' + t.result);
        let wjnr = '';
        const d = t.result.split('base64,')[1];
        if (d) {
          wjnr = d;
        } else {
          wjnr = t.result;
        }
        const today = new Date();

        const sygid = sessionStorage.getItem('currentUser');
        const data = new FileBean('', file.name, '', `${file.size}`, '1', file.name, getDateStr(today), wjnr, sygid);
        service.wjsave(data).subscribe(
          s => {
            console.log('wjsave:' + s);
            if (s.state) {
              alert('上传文件成功！');
            } else {
              alert('上传失败：' + s.errorMsg);
            }
          }
        );
      };

      reader.readAsDataURL(file); // 返回一个基于Base64编码的data-uri对象
    }
  }
}
