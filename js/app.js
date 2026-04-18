const { createApp, ref, onMounted, computed } = Vue;
createApp({
    setup() {
const titulo = ref('🎵 Disquería de Vinilo');
const discos = ref([]);
const filtro = ref('todos');
const busqueda = ref('');
const cargando = ref(true);
// AJAX: carga el catálogo desde el JSON
async function cargarDiscos() {
    try {
        cargando.value = true;
const respuesta = await fetch('data/discos.json');
const datos = await respuesta.json();
discos.value = datos;
    } catch (error) {
        console.error('Error al cargar los discos:', error);
} finally {
    cargando.value = false;
}

}
const discosFiltrados = computed(() => {
    return discos.value.filter(disco => {
        const coincideGenero = filtro.value === 'todos' ||
            disco.genero.toLowerCase() === filtro.value.toLowerCase();
        const coincideBusqueda = disco.artista.toLowerCase().includes(busqueda.value.toLowerCase()) ||
            disco.album.toLowerCase().includes(busqueda.value.toLowerCase());
        return coincideGenero && coincideBusqueda;
    });
});
onMounted(() => {
    cargarDiscos(); // Se ejecuta cuando Vue termina de montar
});
return { titulo, discos, filtro, busqueda, cargando, discosFiltrados };
    }
}).mount('#app');